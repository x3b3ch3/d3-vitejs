require 'open-uri'
require 'date'
require 'active_support/core_ext/date/calculations'
require 'active_support/core_ext/date_time/conversions'
require 'json'

start_date = DateTime.new(2003,10,13)
# end_date = DateTime.new(2003,11,13)
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
			json_file = URI.open("https://cmsapi.pulselive.com/rugby/rankings/mru?date=#{week}&client=pulse")
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

			rank['teamId'] = team['id']

			global_teams[rank['teamId']] = JSON.parse('{}') unless global_teams[rank['teamId']]
			global_teams[rank['teamId']][week] = rank_for_team unless global_teams[rank['teamId']][week]


			# si le fichier teams ne connait pas cette équipe
			if !teams[team['id']]
				team_id = team['id']
				team.delete('altId')
				team.delete('annotations')
				team.delete('id')
				teams[team_id] = team
			else
				puts "team #{team['id']} (#{team['name']}) already exists"
			end

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
  f.write teams.to_json
end

File.open('./datas.min.json','w') do |f|
  f.write backup.to_json
end