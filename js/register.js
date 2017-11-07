(()=>{
    var n=$(".uname input");
    var p=$(".upwd input");
    var c=$(".checkUpwd input");
    var sub=$("button[name=submit]");
    var spanUname=$(".uname span.show-uname");
    var spanUpwd=$(".upwd span.show-upwd");
    var spanCheck=$(".checkUpwd span.show-check");
    var yzm=$("#yzm");
    var yzmInput=$(".yzm input");
    var ctx=yzm[0].getContext("2d");
    var str="";
    var isUname=false,isUpwd=false,isCheck=false,isYzm=false;
    var isChecked=$("#agree");
    n.focus(()=>{
        if(n.val()==""){
            spanUname.html("5-11位，字母开头");
            isUname = true;
        }
    });
    p.focus(()=>{
        if(p.val()==""){
            spanUpwd.html("6-8位");
            isUpwd = true;
        }
    });
    n.blur(()=>{
        if(n.val()=="")
            spanUname.html("用户名不能为空");
        else if(n.val().search(/^[A-Za-z][\w]{4,10}$/)==-1){
            spanUname.html("格式错误");
        }else{
            $.ajax({
                type:"POST",
                url:"../data/00-checkUname.php",
                data:"uname="+n.val(),
                success:data=>{
                    if(data=="0")
                        spanUname.html("用户名已存在");
                    else{
                        spanUname.html("通过");
                        isCheck = true;
                    }
                }
            })
        }
    });
    p.blur(()=>{
        if(p.val()=="")
            spanUpwd.html("密码不能为空");
        else if(p.val().search(/^[\w]{6,8}$/)==-1)
            spanUpwd.html("格式错误");
        else
            spanUpwd.html("通过");
    });
    c.blur(()=>{
        if(p.val()=="")
            spanCheck.html("密码不能为空");
        else if(c.val() == p.val())
            spanCheck.html("通过");
        else
            spanCheck.html("两次输入密码不一致");
    });
    sub.click(()=>{
        if(isUname & isUpwd & isCheck & isYzm & isChecked.is(":checked")) {
            $.ajax({
                type: "GET",
                url: "../data/00-register.php",
                data: "uname=" + n.val() + "&upwd=" + p.val(),
                success: data=> {
                    if (data == "1") {
                        alert("注册成功");
                        location.href="login.html";
                    }
                }
            })
        }else{
            alert("注册失败");
            location.href="register.html";
        }
    });
    //验证码canvas
    //定义画布样式
    function valiCode(str){
        //参数：
        let w = yzm.width();
        let h = yzm.height();
        ctx.width=w;
        ctx.height=h;
        //生成随机数
        function rn(min,max){
            return Math.floor(Math.random()*(max-min)+min);
        }
        //生成随机颜色
        function rc(min,max){
            let r=rn(min,max);
            let g=rn(min,max);
            let b=rn(min,max);
            return `rgb(${r},${g},${b})`;
        }
        //背景绘制
        ctx.fillStyle=rc(200,250);
        ctx.fillRect(0,0,w,h);
        //文字绘制
        ctx.font = "30px SimHei";
        ctx.fillStyle = rc(80,180);
        ctx.textBaseline = "top";
        ctx.fillText(str,0,0);
        //干扰线绘制
        for(let i=0;i<4;i++){
            ctx.beginPath();
            ctx.strokeStyle=rc(0,255);
            ctx.moveTo(rn(0,w),rn(0,h));
            ctx.lineTo(rn(0,w),rn(0,h));
            ctx.stroke();
        }
        //干扰点绘制
        for(let i=0;i<4;i++){
            ctx.beginPath();
            ctx.fillStyle=rc(0,255);
            ctx.arc(rn(0,w),rn(0,h),1,0,2*Math.PI);
            ctx.fill();
        }
    }
    valiCode();
    //ajax请求随机字符
    function makeText(){
        $.ajax({
            type:"GET",
            url:"../data/00-random.php",
            data:"",
            success:data=>{
                str=data;
                valiCode(str);
            }
        })
    }
    yzm.click(()=>{
        makeText()
    });
    $(()=>{
        makeText()
    });
    yzmInput.blur(()=>{
        if(yzmInput.val().toLowerCase()==str.toLowerCase()) {
            isYzm = true;
        }
    })
})();
