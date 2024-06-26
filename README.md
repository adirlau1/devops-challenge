# DevOps Take-Home Challenge

## Objective

To assess your skills in continuous integration, continuous deployment, and infrastructure as code, you will complete the following tasks. You will deploy this small web application using a CI/CD pipeline, and manage the infrastructure using Terraform.

## Overview

You will use Docker to containerize the application, set up a CI/CD pipeline using GitHub Actions, and manage the infrastructure on AWS using Terraform.

## Tasks

1. **Containerization**
   - Write a Dockerfile to containerize the application.
   - Ensure the application runs correctly inside the container.

2. **Continuous Integration (CI)**
   - Set up a GitHub repository for your application.
   - Configure GitHub Actions to:
     - Automatically build the Docker image upon each commit.
     - Run a basic lint check or unit test.

3. **Infrastructure as Code (IaC)**
   - Use Terraform to provision the necessary infrastructure on AWS:
     - An EC2 instance to host your application.
     - Security group to allow necessary traffic (e.g., port 80 for HTTP).
   - Ensure the Terraform scripts are modular and reusable.

4. **Continuous Deployment (CD)**
   - Extend the GitHub Actions workflow to:
     - Push the Docker image to a container registry (e.g., Docker Hub).
     - Deploy the application to the EC2 instance using the Docker image.

## Deliverables

1. **Code Repository:**
   - A fork of this GitHub repository with:
     - The source code of the application.
     - The Dockerfile.
     - GitHub Actions workflows.
     - Terraform scripts.

2. **Documentation:**
   - A README.md file explaining:
     - How to build and run the application locally.
     - How to set up the infrastructure using Terraform.
     - How to deploy the application using the CI/CD pipeline.

## Submission

Submit the link to your GitHub repository to vlad@qed.team.

---

## Getting Started

### Prerequisites

- Docker installed on your local machine
- AWS CLI configured with appropriate permissions
- Terraform installed on your local machine
- Node.js and Yarn installed on your local machine

### Repository Structure

```
.github/workflows
├── build.yml
├── deploy.yml
tests
└── test.js
bin
node_modules
public
routes
terraform
├── security_group_module
│ └── main.tf
├── aws_provider.tf
├── main.tf
└── variables.tf
views
.gitignore
app.js
Dockerfile
eslint.config.mjs
package-lock.json
package.json
README.md
yarn.lock
```


### Building and Running the Application Locally

1. **Clone the repository:**

    ```bash
    git clone git@github.com:adirlau1/devops-challenge.git
    cd devops-challenge
    ```

2. **Install dependencies:**

    ```bash
    yarn install
    ```

3. **Run the application:**

    ```bash
    yarn start
    ```

### Dockerization

1. **Build the Docker image:**

    ```bash
    docker build -t adirlau/my-node-app .
    ```

2. **Run the Docker container:**

    ```bash
    docker run -d -p 3000:3000 adirlau/my-node-app
    ```

   The application should now be accessible at `http://localhost:3000`.


### Setting up the Infrastructure using Terraform

1. **Configure AWS CLI:**

    ```bash
    aws configure
    ```

    Follow the prompts to enter your AWS Access Key ID, Secret Access Key, region, and output format.

2. **Set AWS Credentials as Environment Variables:**

    ```bash
    export AWS_ACCESS_KEY_ID=your-access-key-id
    export AWS_SECRET_ACCESS_KEY=your-secret-access-key
    export AWS_DEFAULT_REGION=your-aws-region
    ```

3. **Navigate to the Terraform directory:**

    ```bash
    cd terraform
    ```

4. **Initialize Terraform:**

    ```bash
    terraform init
    ```

5. **Plan the infrastructure changes:**

    ```bash
    terraform plan -out=tfplan
    ```

6. **Apply the infrastructure changes:**

    ```bash
    terraform apply -auto-approve tfplan
    ```

   After the infrastructure is set up, the application should be accessible at `http://<ec2-public-ip>:3000`.


### CI/CD Pipeline

The CI/CD pipeline is configured using GitHub Actions and consists of two workflows: `build.yml` and `deploy.yml`.

#### Build Pipeline (`.github/workflows/build.yml`)

This workflow triggers on every push or pull request to the `main` branch and performs the following steps:

1. Checks out the repository
2. Sets up Node.js
3. Installs dependencies
4. Runs lint and tests
5. Builds the Docker image
6. Pushes the Docker image to Docker Hub
7. Tags the Docker image with the commit SHA and pushes the tagged image

#### Deploy Pipeline (`.github/workflows/deploy.yml`)

This workflow triggers upon the successful completion of the `Build Pipeline` and performs the following steps:

1. Checks out the repository
2. Configures AWS credentials
3. Initializes Terraform
4. Plans and applies the Terraform infrastructure changes
5. Handles importing existing resources and retrying the apply if necessary

### Configuring Secrets in GitHub Repository

1. **Go to your GitHub repository:**
   - Navigate to your GitHub repository.
   - Click on `Settings`.

2. **Set up GitHub Secrets:**
   - In the left sidebar, click on `Secrets` under the `Security` section.
   - Click on `New repository secret`.

3. **Add the following secrets:**

   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_DEFAULT_REGION`
   - `DOCKER_USERNAME`
   - `DOCKER_PASSWORD`

   For each secret, provide the respective value.

### Additional Notes

- Ensure your Docker Hub credentials and AWS credentials are stored as secrets in your GitHub repository settings.
- The Terraform scripts are modular and designed to be reusable for different environments.

## Conclusion

This README provides a detailed guide on how to build, run, and deploy your application using the provided CI/CD pipeline and Terraform scripts. If you have any questions or need further assistance, feel free to reach out.

---
