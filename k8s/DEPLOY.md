# Deploy to Kubernetes

## Prerequisites
- Docker installed
- kubectl configured for your cluster
- NGINX Ingress Controller installed in cluster

## Steps

1. **Build Docker image**
   ```bash
   docker build -f doodl/docs/Dockerfile -t doodl-docs:latest .
   ```

2. **Push to registry** (if using remote cluster)
   ```bash
   docker tag doodl-docs:latest your-registry/doodl-docs:latest
   docker push your-registry/doodl-docs:latest
   ```
   Then update `image:` in `k8s-deployment.yaml`

3. **Deploy to Kubernetes**
   ```bash
   kubectl apply -f k8s-deployment.yaml
   kubectl apply -f k8s-service.yaml
   kubectl apply -f k8s-ingress.yaml
   ```

4. **Access the app**
   - Add to `/etc/hosts`: `127.0.0.1 doodl-docs.local`
   - Visit: http://doodl-docs.local

## Check status
```bash
kubectl get pods,svc,ingress
kubectl logs -l app=doodl-docs
```

## Clean up
```bash
kubectl delete -f k8s-deployment.yaml -f k8s-service.yaml -f k8s-ingress.yaml
```