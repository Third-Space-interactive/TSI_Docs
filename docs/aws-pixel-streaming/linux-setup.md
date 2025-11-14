---
sidebar_position: 2
---

# Linux Setup Guide

Comprehensive guide for packaging and deploying Unreal Engine projects with Pixel Streaming on AWS Linux instances using cross-compilation from Windows.

## Prerequisites

### Video Tutorial

- [Initial Build Testing Walkthrough](https://www.youtube.com/watch?v=MVm5got0RMY)

### Documentation References

- [Cross Compilation Toolchain for UE 5.4+](https://dev.epicgames.com/documentation/en-us/unreal-engine/linux-development-requirements-for-unreal-engine?application_version=5.6)

---

## Part 1: Packaging the Project for Linux (Cross-Compilation from Windows)

### Step 1: Download Linux Content

1. Open Epic Games Launcher
2. Ensure Linux content is downloaded for your Unreal Engine version

### Step 2: Install Cross Compilation Toolchain

For Unreal Engine 5.4+, you need the V22 Clang 16.0.6 toolchain.

#### Verify Installation

Run the following command to verify your toolchain installation:

```bash
%LINUX_MULTIARCH_ROOT%x86_64-unknown-linux-gnu\bin\clang++ -v
```

:::warning Important
Ensure you have an environment variable called `LINUX_MULTIARCH_ROOT` set to the absolute path of the directory where the toolchain was installed.
:::

### Step 3: Set Up WSL (Windows Subsystem for Linux)

Install WSL and Ubuntu:

```bash
wsl --install
```

```bash
wsl.exe --install Ubuntu
```

#### WSL Commands Reference

List available distributions:

```bash
wsl -l -o
```

Install a specific distribution:

```bash
wsl --install -d [name-of-distro]
```

Enter WSL:

```bash
wsl
```

Convert Windows path to WSL path:

```bash
wslpath "[windows-directory-path]"
```

Navigate to your project:

```bash
cd "[unix-directory-path]"
```

List files:

```bash
ls
```

Run your project (test):

```bash
./[name-of-project].sh -nullrhi
```

Stop execution:

```
Ctrl-c
```

---

## Part 2: AWS Instance Setup

### Step 0: Launch EC2 Instance

1. Choose a **GPU-based instance** (recommended: `g4dn.xlarge`)
2. Use the latest Ubuntu image
3. Configure security groups to allow:
   - TCP ports: 80, 8888 (WebSocket and HTTP signaling)
   - UDP/TCP ports: 3478, 5349 (STUN/TURN via coturn)
   - ELB/HTTPS (if using SSL)

#### SSH into Instance

Using WSL or Bash:

```bash
ssh -i "/path/to/your/key.pem" ubuntu@your-ec2-public-ip
```

Example:

```bash
ssh -i "/mnt/d/path/to/my-key.pem" ubuntu@public-ip.us-east-2.compute.amazonaws.com
```

### Step 1: Install Dependencies

Update and install required packages:

```bash
sudo apt update
```

```bash
sudo apt install -y nodejs npm coturn git build-essential
```

Optional packages:

```bash
# Install AWS CLI, unzip, etc. if needed
sudo snap install aws-cli --classic
```

---

## Part 3: Install NVIDIA Gaming Drivers

### Reference Documentation

- [AWS Guide: Unreal Engine Pixel Streaming on AWS](https://aws.plainenglish.io/unreal-engine-pixel-streaming-on-aws-building-a-homemade-cloud-gaming-prototype-41b90c72c5ce)
- [AWS Docs: Install NVIDIA Driver](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-nvidia-driver.html)

### Driver Installation Steps

#### 1. Install Build Tools

```bash
sudo apt-get install -y gcc make build-essential
```

#### 2. Update Package Cache

```bash
sudo apt-get update -y
```

#### 3. Upgrade Linux-AWS Package

```bash
sudo apt-get upgrade -y linux-aws
```

#### 4. Reboot Instance

```bash
sudo reboot
```

After reboot, reconnect to your instance.

#### 5. Install Kernel Headers

```bash
sudo apt install -y unzip dkms linux-headers-$(uname -r)
```

#### 6. Disable Nouveau Driver

Add nouveau to the blacklist:

```bash
cat << EOF | sudo tee --append /etc/modprobe.d/blacklist.conf
blacklist vga16fb
blacklist nouveau
blacklist rivafb
blacklist nvidiafb
blacklist rivatv
EOF
```

Edit the Grub configuration:

```bash
sudo vim /etc/default/grub
```

Add the following line:

```
GRUB_CMDLINE_LINUX="rdblacklist=nouveau"
```

Rebuild Grub:

```bash
sudo update-grub
```

#### 7. Download Gaming Drivers

Download from AWS S3:

```bash
aws s3 cp --recursive s3://nvidia-gaming/linux/latest/ .
```

View all available versions:

```bash
aws s3 ls --recursive s3://nvidia-gaming/linux/
```

#### 8. Extract and Install Drivers

```bash
unzip *Gaming-Linux-Guest-Drivers.zip -d nvidia-drivers
```

```bash
chmod +x nvidia-drivers/NVIDIA-Linux-x86_64*-grid.run
```

```bash
sudo nvidia-drivers/NVIDIA-Linux-x86_64*.run
```

Accept the license agreement and follow the installation prompts.

#### 9. Configure NVIDIA Grid

Create the configuration file:

```bash
cat << EOF | sudo tee -a /etc/nvidia/gridd.conf
vGamingMarketplace=2
EOF
```

Download the certification file (choose based on driver version):

For version 460.39 or later:

```bash
sudo curl -o /etc/nvidia/GridSwCert.txt "https://nvidia-gaming.s3.amazonaws.com/GridSwCert-Archive/GridSwCertLinux_2024_02_22.cert"
```

For version 440.68 to 445.48:

```bash
sudo curl -o /etc/nvidia/GridSwCert.txt "https://nvidia-gaming.s3.amazonaws.com/GridSwCert-Archive/GridSwCert-Linux_2020_04.cert"
```

For earlier versions:

```bash
sudo curl -o /etc/nvidia/GridSwCert.txt "https://nvidia-gaming.s3.amazonaws.com/GridSwCert-Archive/GridSwCert-Linux_2019_09.cert"
```

#### 10. Disable GSP (For Driver 510.x+ on G4dn, G5, G5g)

```bash
sudo touch /etc/modprobe.d/nvidia.conf
```

```bash
echo "options nvidia NVreg_EnableGpuFirmware=0" | sudo tee --append /etc/modprobe.d/nvidia.conf
```

#### 11. Final Reboot

```bash
sudo reboot
```

---

## Part 4: Transfer Project Files to EC2

### SCP File Transfer

Basic syntax:

```bash
scp -i /location/to/your/my-key.pem ~/Documents/file.txt ec2-user@your-ec2-public-ip:/home/ec2-user/
```

#### For Example

Transfer your Linux build:

```bash
scp -i /location/to/your/my-key.pem "/Where/you/saved/project/Linux.zip" ubuntu@public-ip:/home/ubuntu/
```

### Unzip Project Files

```bash
unzip Linux.zip
```

---

## Part 5: Configure Pixel Streaming Servers

:::tip Note
These docs use the pixel streaming sample exported with an Unreal Engine project. You must have the `Pixel Streaming Plugin` enabled at the time of export for this to be availble. Alternatively, you can git clone https://github.com/EpicGamesExt/PixelStreamingInfrastructure or your own customized frontend
:::

### Step 1: Install DOS2Unix

Fix line endings for scripts:

```bash
sudo apt install dos2unix
```

### Step 2: Navigate to Web Servers Directory

```bash
cd /Linux/RH_Project_RHIX/Samples/PixelStreaming/WebServers
```

### Step 3: Download Pixel Streaming Servers

```bash
chmod +x get_ps_servers.sh
```

```bash
dos2unix get_ps_servers.sh
```

```bash
./get_ps_servers.sh
```

### Step 4: Setup Signalling Server

Navigate to the bash scripts:

```bash
cd SignallingWebServer/platform_scripts/bash
```

Run setup:

```bash
chmod +x setup.sh
```

```bash
./setup.sh
```

Make the start script executable:

```bash
chmod +x Start_WithTURN_SignallingServer.sh
```

### Alternative: Single Command Setup

Quick setup from root:

```bash
chmod +x Linux/RH_Project_RHIX/Samples/PixelStreaming/WebServers/SignallingWebServer/platform_scripts/bash/Start_WithTURN_SignallingServer.sh
```

```bash
chmod +x Linux/RH_Project_RHIX.sh
```

### Fix CRLF Issues (If Needed)

If you still encounter "CRLF line terminators" errors:

```bash
sed -i 's/\r$//' get_ps_servers.sh
```

---

## Part 6: Launch Pixel Streaming

### Terminal 1: Start Signalling Server with TURN

```bash
./Linux/RH_Project_RHIX/Samples/PixelStreaming/WebServers/SignallingWebServer/platform_scripts/bash/Start_WithTURN_SignallingServer.sh
```

:::tip Note
If using the Pixel Streaming Infrastructure repository from Git, the Signalling Server start command will be as follows: `./PixelStreamingInfrastructure/SignallingWebServer/platform_scripts/bash/start_with_turn.sh`
:::

### Terminal 2: Launch Unreal Engine Project

Navigate to Linux build directory:

```bash
cd Linux
```

Make executable:

```bash
chmod +x RH_Project_RHIX.sh
```

Run the project:

```bash
./RH_Project_RHIX.sh -AudioMixer -PixelStreamingIP=localhost -PixelStreamingPort=8888 -ResX=1920 -ResY=1080 -ForceRes -RenderOffScreen
```

Or for lower resolution:

```bash
./Linux/RH_Project_RHIX.sh -AudioMixer -PixelStreamingIP=localhost -PixelStreamingPort=8888 -ResX=1280 -ResY=720 -ForceRes -RenderOffScreen
```

### Monitor System Resources

Use htop to track system analytics:

```bash
htop
```

---

## Part 7: Auto-Start on Boot (Optional)

### Step 1: Create Wrapper Script

Create a wrapper script to launch both services:

```bash
nano /home/ubuntu/startup_wrapper.sh
```

Add the following content:

```bash

# Start the signalling server in the background
/home/ubuntu/Linux/RH_Project_RHIX/Samples/PixelStreaming/WebServers/SignallingWebServer/platform_scripts/bash/Start_WithTURN_SignallingServer.sh &

# Wait for TURN server to initialize
sleep 5

# Start the main application
/home/ubuntu/Linux/RH_Project_RHIX.sh -AudioMixer -PixelStreamingIP=localhost -PixelStreamingPort=8888 -ResX=1920 -ResY=1080 -ForceRes -RenderOffScreen
```

Make it executable:

```bash
chmod +x /home/ubuntu/startup_wrapper.sh
```

### Step 2: Create Systemd Service

Create the service file:

```bash
sudo nano /etc/systemd/system/startup-scripts.service
```

Add the following configuration:

```ini
[Unit]
Description=Start Pixel Streaming with TURN and RHIX on Boot
After=network.target

[Service]
Type=simple
ExecStart=/bin/bash /home/ubuntu/startup_wrapper.sh
User=ubuntu
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

### Step 3: Enable and Start Service

Reload systemd:

```bash
sudo systemctl daemon-reload
```

Enable service to start on boot:

```bash
sudo systemctl enable startup-scripts.service
```

Start the service immediately:

```bash
sudo systemctl start startup-scripts.service
```

Check service status:

```bash
sudo systemctl status startup-scripts.service
```

---

## Troubleshooting

### Check NGINX Configuration

If you need to configure NGINX:

```bash
sudo vim /etc/nginx/nginx.conf
```

### Common Issues

#### CRLF Line Endings

If scripts fail with line ending errors, use:

```bash
dos2unix [script-name].sh
```

or

```bash
sed -i 's/\r$//' [script-name].sh
```

#### Permission Denied

Make sure scripts are executable:

```bash
chmod +x [script-name].sh
```

#### Port Already in Use

Check what's using the port:

```bash
sudo lsof -i :8888
```

Kill the process if needed:

```bash
sudo kill -9 [PID]
```

#### GPU Not Detected

Verify NVIDIA driver installation:

```bash
nvidia-smi
```

If this command fails, revisit Part 3 to ensure drivers are properly installed.

---

## Additional Notes

- **Security Groups**: Ensure your AWS security groups allow the necessary ports
- **Instance Type**: GPU instances like `g4dn.xlarge` are recommended for optimal performance
- **Monitoring**: Use CloudWatch to monitor instance performance and costs
- **Backups**: Create AMI snapshots of your configured instance for easy recovery
- **SSL/HTTPS**: For production, configure SSL certificates for secure connections
- **Scaling**: Consider using Auto Scaling Groups for handling multiple concurrent users

---

## Quick Command Reference

```bash
# SSH into instance
ssh -i "/path/to/key.pem" ubuntu@your-instance-ip

# Transfer files
scp -i "/path/to/key.pem" "/path/to/file.zip" ubuntu@instance-ip:/home/ubuntu/

# Start signalling server
./Start_WithTURN_SignallingServer.sh

# Launch UE project
./[ProjectName].sh -AudioMixer -PixelStreamingIP=localhost -PixelStreamingPort=8888 -ResX=1920 -ResY=1080 -ForceRes -RenderOffScreen

# Check service status
sudo systemctl status startup-scripts.service

# Monitor system
htop

# Check GPU status
nvidia-smi
```

---

:::tip Success
Your AWS Pixel Streaming instance should now be running and accessible. Users can connect to your application through a web browser using your instance's public IP address on port 80.
:::
