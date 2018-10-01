# random-bulk-metrics

Node CLI app for spitting out time-based metric data in bulk format. 

## Usage

1. `npm link`
2. `random-bulk-metrics | pbcopy`
3. Paste the output into Kibana's Console: https://www.elastic.co/guide/en/kibana/current/console-kibana.html

## Options 
The defaults generate 500 documents with timestamps spread evenly over the last 1 year.
- `--spread=N`: Spit out N documents instead of 500
- `--date=YYYY-MM-DD`: Different start date instead of 1 year ago. This actually doesn't work TBH. PRs welcome?
