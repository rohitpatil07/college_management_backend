# college_management_backend
Backend to college_management repository

#Containerization steps
1.Download respective images for frontend and backend using 
```
docker pull rohitpatil07/collegemgmt-client
docker pull rohitpatil07/collegemgmt-server
```
OR 
Create your own images using the provided Dockerfiles (this option is prefered as we will be seeding the database to add some records)
Make these lines is uncommented in Dockerfile so that it will wait for db to fire up and then seed the database
Seed file is found in prisma/seed.js (see package.json for the script)
```
RUN apt-get update && apt-get install -y wait-for-it
CMD ["wait-for-it", "db:3306", "--", "yarn", "prisma", "db", "push", "&&", "yarn", "prisma:seed","&&", "yarn", "start"]
```
In compose.yml file make these changes on server service keep rest as same
```
server:
    build: 
      context: .
      dockerfile: Dockerfile
```
Run below command after pulling "rohitpatil07/collegemgmt-client" image
```
docker compose up -d
```
When the seeding is done run
```
docker compose down
```
Now comment the previous two lines since seeding is done and change Dockerfile to
```
# Install wait-for-it
# RUN apt-get update && apt-get install -y wait-for-it

# Wait for the database to be ready before executing Prisma migrations and seeding
#Use this cmd at first deployment
# CMD ["wait-for-it", "db:3306", "--", "yarn", "prisma", "db", "push", "&&", "yarn", "prisma:seed","&&", "yarn", "start"]

#Uncomment this for next iterations
CMD ["yarn", "dev"]
```
And change compose.yml
```
server:
    image: your_image_name
    # build: 
    #   context: .
    #   dockerfile: Dockerfile
```
And run
```
docker build -t your_image_name .
```
Finally run 
```
docker compose up -d 
```
Your full stack app is deployed on localhost:3000

#Further notes:-
To verify seeding  check db data (password is set on db service variables)
```
docker compose exec -it db bash
mysql -u root -p
use tpcdatabase;
```
Then navigate through database and make required changes
Give it a try
