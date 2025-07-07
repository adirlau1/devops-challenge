# Cloud DevOps Starter

**End-to-end demo project** that shows how I design, build and ship a small web application using modern DevOps practices:

- **Containerisation** with Docker  
- **Continuous Integration & Delivery** via GitHub Actions  
- **Infrastructure as Code** with Terraform on AWS

The goal is to provide a concise, production-ready template you can fork, study or extend when you need a clean DevOps starter kit.

---

## ✨ Key Highlights

| Capability           | Tech                               | What it demonstrates                                           |
|----------------------|------------------------------------|----------------------------------------------------------------|
| Application runtime  | **Node.js (Express)**              | Lightweight placeholder workload                               |
| Containerisation     | **Docker**                         | Multi-stage build, final image <120 MB                          |
| CI                   | **GitHub Actions** (`build.yml`)   | Lint + unit tests, image build & push, commit-SHA tagging       |
| IaC                  | **Terraform 1.x**                  | Modular code, remote state ready, versioned providers          |
| Hosting              | **AWS EC2**                        | VPC, public EC2 instance, Security Group, IAM least-privilege   |
| CD                   | **GitHub Actions** (`deploy.yml`)  | Zero-touch deploy with import / retry fallback logic           |
| Secrets              | **GitHub Encrypted Secrets**       | No credentials in repo                                          |

> **Why EC2?** It’s the lowest common denominator for any AWS account.  Modules are drop-in replaceable with EKS, ECS or Fargate.  
> **Need Kubernetes?** Check the [`eks` branch](./tree/eks) for the same app on an EKS cluster via Helm + ArgoCD.

---

## 📐 Architecture

```text
┌────────────┐       git push        ┌──────────────┐       terraform apply        ┌───────────────┐
│ Developer  │ ───────────────────▶ │   CI job     │ ───────────────────────────▶ │  AWS  infra   │
└────────────┘                      └──────────────┘                               └───────────────┘
      ▲                                  │  docker build / test                          │
      │                                  ▼                                              │
      │                              Docker Hub  ◀───────────────────────────────────────┘
      │                                  │  pull
      └─────────────── SSH  +  `docker pull && docker run`  ────────────────────────────┘
```

---

## 🚀 Quick Start

### 1️⃣ Clone the project
```bash
git clone https://github.com/<your-user>/cloud-devops-starter.git
cd cloud-devops-starter
```

### 2️⃣ Run locally
```bash
yarn install && yarn start      # http://localhost:3000
```

### 3️⃣ Build the Docker image
```bash
docker build -t my-node-app .
docker run -p 3000:3000 my-node-app
```

### 4️⃣ Deploy infrastructure with Terraform
```bash
cd terraform
terraform init
terraform plan -out=tfplan
terraform apply -auto-approve tfplan
```

### 5️⃣ Configure GitHub Secrets
Add these secrets in your repo Settings → Secrets → *Actions*:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_DEFAULT_REGION`
- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`

Then push to `main` and CI/CD will kick in.

---

## ⚙️ Workflows Breakdown

### `build.yml`
- Trigger: push / PR on `main`
- Steps:
  - Checkout
  - Setup Node 20
  - Lint & test
  - Build Docker
  - Login & push to Docker Hub
  - Tag image with commit SHA

### `deploy.yml`
- Trigger: successful `build.yml`
- Steps:
  - Terraform `init/plan/apply`
  - On failure: import SG + running EC2s
  - Terminate old instances
  - Retry `apply`

---

## 🗂️ Project Structure

```text
.github/workflows/       # CI/CD pipelines
 ├── build.yml
 └── deploy.yml

terraform/
 ├── aws_provider.tf
 ├── main.tf
 ├── variables.tf
 ├── .terraform.lock.hcl
 └── security_group_module/
     └── main.tf

__tests__/
 └── test.js

routes/
 ├── index.js
 └── users.js

views/
public/stylesheets/
 └── style.css

Dockerfile
app.js
README.md
```


---

## 📄 License

[MIT](LICENSE)

---

Made with 🛠️ by **Andrei Dîrlău**
