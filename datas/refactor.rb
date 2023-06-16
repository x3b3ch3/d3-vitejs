require 'open-uri'
require 'json'

backup = JSON.parse(File.read('./datas.min.json'))
# end

out = {dates:{},teams:{}}
backup.each do |date, values|
	if out[:dates][date].nil?
		out[:dates][date] = values.map do |data|
			data['team_id'] = data['team']['id'].to_s
			if (out[:teams][data['team_id']].nil?)
				data['team'].delete('id')
				data['team'].delete('altId')
				data['team'].delete('annotations')
				out[:teams][data['team_id']] = data['team']
			end
			data.delete('team')
			data
		end
	end
end

File.open('./refactor.min.json','w') do |f|
  f.write out.to_json
end