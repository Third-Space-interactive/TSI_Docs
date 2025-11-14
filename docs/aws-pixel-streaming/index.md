---
sidebar_position: 1
---

# AWS Pixel Streaming

Welcome to the AWS Pixel Streaming deployment guide. This section covers everything you need to deploy Unreal Engine Pixel Streaming applications on AWS infrastructure.

## Overview

Pixel Streaming allows you to run Unreal Engine applications in the cloud and stream the rendered content to users' browsers without requiring them to download or install anything. AWS provides powerful GPU instances perfect for hosting these applications.

## Available Guides

### [Linux Setup Guide](./linux-setup)

Complete walkthrough for deploying Unreal Engine Pixel Streaming projects on AWS Linux instances, including:

- Cross-compilation from Windows to Linux
- EC2 instance configuration with GPU support
- NVIDIA driver installation
- Pixel Streaming infrastructure setup
- Auto-start configuration for production deployments

## Prerequisites

Before starting with AWS Pixel Streaming deployment, ensure you have:

- **Unreal Engine Project** with Pixel Streaming plugin enabled
- **AWS Account** with appropriate permissions to create EC2 instances
- **Basic Linux/WSL Knowledge** for command-line operations
- **SSH Key Pair** for accessing AWS instances

## Recommended AWS Instance Types

For optimal Pixel Streaming performance, we recommend GPU-based instances:

- **g4dn.xlarge** - Good balance of performance and cost
- **g4dn.2xlarge** - Better performance for complex scenes
- **g5.xlarge** - Latest generation GPU instances

## Getting Started

If this is your first time deploying Pixel Streaming to AWS, start with the [Linux Setup Guide](./linux-setup) which covers the complete deployment process from start to finish.

## Support

For additional help or questions, visit our [main website](https://thirdspaceinteractive.ca) or check the official [Unreal Engine Pixel Streaming Documentation](https://docs.unrealengine.com/en-US/SharingAndReleasing/PixelStreaming/).
