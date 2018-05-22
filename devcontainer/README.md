This docker image installs and runs the bridge server (along with postgres, redis), ipfs, and ganache on Ubuntu 16.04, using pm2. To run, have docker installed and be in the same directory as the Dockerfile then:

1. Build the docker image:
`docker build -f Dockerfile -t <image name> .`

2. Get the image ID:
`docker images`

3. Run the image with port mappings:
`docker run -d -p 4000:4000 -p 5000:5000 -p 5002:5002 -p 5432:5432 -p 6379:6379 -p 8080:8080 -p 8545:8545 --name origin-dev <image ID>`

4. Access the CLI using `docker exec -it <container ID> /bin/bash` (get the container ID from `docker ps`)

**Connectivity tests from localhost:**
- bridge server: curl http://127.0.0.1:5000
- ipfs: curl 127.0.0.1:5002; curl 127.0.0.1:8080
- postgres:  psql -h 127.0.0.1 -p 5432 -d "bridge-server" -U docker --password <-- currently only working from within the container
- redis: redis-cli <-- defaults to connecting to 127.0.0.1:6379
- ganache: geth attach http://127.0.0.1:8545
- pm2 API (has stats for running applications): curl http://127.0.0.1:4000

**\# netstat -nlt**

|Proto  | Recv-Q |Send-Q |Local Address     |      Foreign Address      |   State      |
| ----- | ------ | ----- | ---------------- | ------------------------- | ------------ |
|tcp    |    0   |   0   | 127.0.0.1:5000   |       0.0.0.0:*           |    LISTEN    |
|tcp    |    0   |   0   | 0.0.0.0:5002     |       0.0.0.0:*           |    LISTEN    |
|tcp    |    0   |   0   | 0.0.0.0:6379     |       0.0.0.0:*           |    LISTEN    |    
|tcp    |    0   |   0   | 0.0.0.0:8080     |       0.0.0.0:*           |    LISTEN    |    
|tcp    |    0   |   0   | 0.0.0.0:5432     |       0.0.0.0:*           |    LISTEN    |    
|tcp    |    0   |   0   | 0.0.0.0:4000     |       0.0.0.0:*           |    LISTEN    |    
|tcp    |    0   |   0   | 0.0.0.0:4002     |       0.0.0.0:*           |    LISTEN    |    

**\# pm2 list**

| App name           | id | mode | pid  | status | restart | uptime | cpu | mem        | user | watching |
| ------------------ | -- | ----- | ---- | ------ | ------- | ------ | ---- | ---------- | ---- | -------- |
| bridge server      | 3  | fork | 27   | online | 0       | 94m    | 0%  | 64.8 MB    | root | disabled |
| celery beat        | 4  | fork | 5514 | online | 1       | 44m    | 0%  | 70.8 MB    | root | disabled |
| celery worker      | 5  | fork | 5490 | online | 1       | 44m    | 0%  | 70.8 MB    | root | disabled |
| ganache            | 2  | fork | 26   | online | 0       | 94m    | 0%  | 100.6 MB   | root | disabled |
| ipfs               | 1  | fork | 20   | online | 0       | 94m    | 0%  | 98.9 MB    | root | disabled |
| pm2-http-interface | 6  | fork | 83   | online | 0       | 94m    | 0%  | 45.0 MB    | root | disabled |
| postgresql         | 6  | fork | 50   | online | 0       | 10h    | 0%  | 3.2 MB     | root | disabled | 
| redis              | 0  | fork | 16   | online | 0       | 94m    | 0%  | 3.6 MB     | root | disabled |


**TODOS:**
- integrate envkey
- templating
- proxy application: one idea is to have a proxy running in the container which can do things like rewrite configs, proxy to a staging environment, upload and download data, etc.
- SDK, whole system integration testing
