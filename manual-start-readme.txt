minikube start
k config current-context
k config use-context gke_ticketing-dev-300600_australia-southeast1-a_ticketing-dev
cd ~/Documents/microservices-with-node-js-and-react/ticketing
skaffold dev
k get po
k port-forward nats-depl-6656b455f4-v69fn 4222:4222