docker build -t drew2222222/docker-nextjs:latest -t drew2222222/docker-nextjs:$SHA -f ./Dockerfile ./

docker push drew2222222/docker-nextjs:latest

docker push drew2222222/docker-nextjs:$SHA

kubectl apply -f k8s
kubectl set image deployments/client-deployment client=drew2222222/docker-nextjs:$SHA
