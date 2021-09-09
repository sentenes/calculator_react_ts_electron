# calculator_react_ts_electron

```shell
yarn start:react &
yarn dev:main &
while True
do
  /usr/bin/nc -w 1 -z localhost 8080 > /dev/null 2>&1
  if [ $? -eq 0 ]
  then
    yarn start:electron &
    break;
  else
    sleep 1
  fi
done

wait


```
