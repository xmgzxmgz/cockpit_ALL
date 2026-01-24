import subprocess
import time
import sys

def run_command(command):
    """运行系统命令并打印输出"""
    print(f"Executing: {command}")
    try:
        process = subprocess.Popen(
            command,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        # 实时打印输出
        while True:
            output = process.stdout.readline()
            if output == '' and process.poll() is not None:
                break
            if output:
                print(output.strip())
                
        return_code = process.poll()
        
        if return_code != 0:
            stderr = process.stderr.read()
            print(f"Error: {stderr}")
            return False
            
        return True
    except Exception as e:
        print(f"Exception occurred: {e}")
        return False

def main():
    print("=" * 50)
    print("开始重新部署 Cockpit 监控系统 Docker 环境")
    print("=" * 50)

    # 1. 停止现有容器
    print("\n[Step 1/3] 停止现有容器...")
    if not run_command("docker-compose down"):
        print("停止容器失败，尝试强制停止...")
        # 尝试继续，也许容器本身就没有运行
    
    # 2. 重新构建并启动
    print("\n[Step 2/3] 重新构建并启动容器 (这可能需要几分钟)...")
    # 添加 --build 确保代码更改被打包进镜像
    if not run_command("docker-compose up -d --build"):
        print("❌ 部署失败！")
        sys.exit(1)
        
    # 3. 检查状态
    print("\n[Step 3/3] 检查服务状态...")
    time.sleep(5) # 等待几秒让容器初始化
    run_command("docker ps")
    
    print("\n" + "=" * 50)
    print("✅ 部署完成！")
    print("访问地址:")
    print("前端: http://localhost:5174")
    print("后端: http://localhost:8002/docs")
    print("=" * 50)

if __name__ == "__main__":
    main()
