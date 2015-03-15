#Mac 安装 node.js  

##方法一:   

>$ brew install node  


##方法二:  
###1. 下载nodejs 
https://nodejs.org/download/  
选择 binary包： Mac OS X Binaries (.tar.gz)  
保存在： /bin/node-v0.12.0/  

###2. 添加path (用户级环境变量)    
sudo vi ~/.bash_profile  
add : export PATH=~/bin/node-v0.12.0/bin/:$PATH  

###3 执行  
>$ source ~/.bash_profile    

使新path生效    

###4. test  
>$ node -v  
>$ npm -v    


---
ashucn@gmail.com