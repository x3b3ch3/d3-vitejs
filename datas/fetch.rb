require 'open-uri'
require 'date'
require 'active_support/core_ext/date/calculations'
require 'active_support/core_ext/date_time/conversions'
require 'json'

start_date = DateTime.new(2003,10,13)
end_date = DateTime.now
backup = JSON.parse(File.read('./datas.min.json'))
ranks = JSON.parse('{}')
teams = JSON.parse('{}')
# end

global_teams = JSON.parse('{}')

(start_date...end_date).step(7).each do |d|
	week = d.strftime('%Y-%m-%d')
	# si la semaine existe déjà dans le fichier rank
	if !ranks[week]
		# si la semaine est dejà dans le backup, sinon on fetche
		if backup[week]
			# puts "get #{week} from local"
		else
			json_file = URI.open("https://api.wr-rims-prod.pulselive.com/rugby/v3/rankings/mru?date=#{week}")
			backup[week] = JSON.parse(File.read(json_file))['entries']
			# puts "get #{week} from remote"
		end

		# on laisse le backup intact et on allège de fichier rank des infos superflues
		ranks[week] = backup[week].map(&:clone)

		# on itère sur toutes les équipes de la data hebomadaire courante
		ranks[week].map do |rank|
			team = rank['team'].clone
			rank_for_team = rank.clone
			rank_for_team.delete('team')
			rank_for_team.delete('matches')
			rank_for_team.delete('previousPts')
			rank_for_team.delete('previousPos')

			team_id = team['id'].to_s

			if !team_id.empty?
				if (global_teams[team_id].nil?)
					global_teams[team_id] = JSON.parse('{}')
				end
				if (global_teams[team_id][week].nil?)
					global_teams[team_id][week] = rank_for_team
				end
			end

			team.delete('altId')
			team.delete('annotations')
			team.delete('countryCode')
			team.delete('id')

			teams[team_id] = team

			# supression des données superflues
			rank['teamId'] = team_id
			rank.delete('team')
			rank.delete('pos')
			rank.delete('previousPts')
			rank.delete('matches')
			rank
		end
	else
		# puts "#{week} already exists"
	end
end

# puts global_teams

global_teams.each do |key, value|
	File.open("./teams/#{key}.min.json",'w') do |f|
	  f.write value.to_json
	end
end 

File.open('./teams.min.json','w') do |f|
	# sort teams with most recent ranking
	# out = JSON.parse('{}')
	last_week = backup.each_value.reverse_each.next rescue StopIteration
	# puts ">>>>>> last week #{last_week}"
	last_week.each do |t|
		team = teams.select do |key, hash|
			!key.nil? && hash['abbreviation'] == t['team']['abbreviation']
		end
		teams[team.keys[0]]['pos'] = t['pos']
		teams[team.keys[0]]['pts'] = t['pts']
	end

  f.write teams.to_json
end

File.open('./datas.min.json','w') do |f|
  f.write backup.to_json
end