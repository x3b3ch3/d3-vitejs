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
			puts "get #{week} from local"
		else
			#json_file = URI.open("https://api.wr-rims-prod.pulselive.com/rugby/v3/rankings/mru?date=#{week}")
			json_file = URI.open("https://cmsapi.pulselive.com/rugby/rankings/mru?date=#{week}")
			backup[week] = JSON.parse(File.read(json_file))['entries']
			puts "get #{week} from remote"
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

			rank['teamId'] = team['id']

			puts "#{week} #{team}" 
			if !rank['teamId'].nil?
				if (global_teams[rank['teamId']].nil?)
					global_teams[rank['teamId']] = JSON.parse('{}')
				end
				if (global_teams[rank['teamId']][week].nil?)
					global_teams[rank['teamId']][week] = rank_for_team
				end
			end

			# si le fichier teams ne connait pas cette équipe
			if !teams[team['id']]
				team_id = team['id']
				team.delete('altId')
				team.delete('annotations')
				team.delete('id')
			else
				puts "team #{team['id']} (#{team['name']}) already exists"
			end

			teams[team_id] = team

			# supression des données superflues
			rank.delete('team')
			rank.delete('pos')
			rank.delete('previousPts')
			rank.delete('matches')
			# rank.delete('previousPos')
			rank
		end
	else
		puts "#{week} already exists"
	end
end

global_teams.each do |key, value|
	File.open("./teams/#{key}.min.json",'w') do |f|
	  f.write value.to_json
	end
end 

File.open('./teams.min.json','w') do |f|
	# sort teams with most recent ranking
	# out = JSON.parse('{}')
	last_week = backup.each_value.reverse_each.next rescue StopIteration
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