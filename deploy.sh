docker build -t drew2222222/docker-nextjs:latest -t drew2222222/docker-nextjs:$SHA -f ./Dockerfile ./
docker build -t drew2222222/docker-nextjs-nginx:latest -t drew2222222/docker-nextjs-nginx:$SHA -f ./nginx/Dockerfile ./

docker network create my-network

docker run --network my-network --name nextjs-container drew2222222/docker-nextjs:latest
docker run --network my-network --link nextjs-container:nextjs --publish 80:80 drew2222222/docker-nextjs-nginx:latest


docker push drew2222222/docker-nextjs:latest
docker push drew2222222/docker-nextjs-nginx:latest

docker push drew2222222/docker-nextjs:$SHA
docker push drew2222222/docker-nextjs-nginx:$SHA

kubectl apply -f k8s
kubectl set image deployments/client-deployment client=drew2222222/docker-nextjs:$SHA
