const can=document.querySelector('canvas')
const ctx=can.getContext("2d")
const w=500
const h=500
can.width=w
can.height=h

class main{
    constructor(dx=25){
        this.dx=dx
        this.nrows=w/dx
        this.ncols=h/dx
        this.board=new Array(this.nrows).fill(0).map((e)=>new Array(this.ncols).fill(0))
        this.state=false
    }
    countChildren(r,c){
        let nchild=0
        for(let i=-1;i<2;i++){
            for(let j=-1;j<2;j++){
                if(i==0 && j==0){
                    continue
                }
                if(r+i>=0 && r+i<this.nrows && c+j>=0 && c+j<this.ncols){
                    nchild+=this.board[r+i][c+j]
                }
            }
        }
        // if(this.board[r][c] && (r==0 || r===this.nrows-1 || c===0 || c===this.ncols-1)){
        //     nchild+=3
        // }
        return nchild
    }
    nextStep(){
        let next=new Array(this.nrows).fill(0).map((e)=>new Array(this.ncols).fill(0))
        for(let i=0;i<this.nrows;i++){
            for(let j=0;j<this.ncols;j++){
                let nchild=this.countChildren(i,j)
                if(this.board[i][j]){
                    if(nchild==3 || nchild==2){
                        next[i][j]=1
                    }
                }else{
                    if(nchild==3){
                        next[i][j]=1
                    }
                }
            }
        }
        this.board=next
    }
    draw(){
        for(let i=0;i<=this.ncols;i++){
            ctx.beginPath()
            ctx.moveTo(i*this.dx,0)
            ctx.lineTo(i*this.dx,h)
            ctx.stroke()
            ctx.closePath()
        }
        for(let i=0;i<=this.nrows;i++){
            ctx.beginPath()
            ctx.moveTo(0,i*this.dx)
            ctx.lineTo(w,i*this.dx)
            ctx.stroke()
            ctx.closePath()
        }
        for(let i=0;i<this.nrows;i++){
            for(let j=0;j<this.ncols;j++){
                if(this.board[i][j]){
                    ctx.beginPath()
                    ctx.fillRect(j*this.dx,i*this.dx,this.dx,this.dx)
                    ctx.closePath()
                }
            }
        }
        if(this.state){
            this.nextStep()
        }
    }
}
const normal=new main(25)
const gun=new main(10)
gun.state=true
gun.board[2][25]=1
gun.board[3][23]=1
gun.board[3][25]=1
gun.board[4][13]=1
gun.board[4][14]=1
gun.board[4][21]=1
gun.board[4][22]=1
gun.board[4][35]=1
gun.board[4][36]=1
gun.board[5][12]=1
gun.board[5][16]=1
gun.board[5][21]=1
gun.board[5][22]=1
gun.board[5][35]=1
gun.board[5][36]=1
gun.board[6][1]=1
gun.board[6][2]=1
gun.board[6][11]=1
gun.board[6][17]=1
gun.board[6][21]=1
gun.board[6][22]=1
gun.board[7][1]=1
gun.board[7][2]=1
gun.board[7][11]=1
gun.board[7][15]=1
gun.board[7][17]=1
gun.board[7][18]=1
gun.board[7][23]=1
gun.board[7][25]=1
gun.board[8][11]=1
gun.board[8][17]=1
gun.board[8][25]=1
gun.board[9][12]=1
gun.board[9][16]=1
gun.board[10][13]=1
gun.board[10][14]=1

let a=gun
can.onclick=(event)=>{
    let x=event.x
    let y=event.y
    let i=y/a.dx>>0
    let j=x/a.dx>>0
    a.board[i][j]=!a.board[i][j]
}
document.onkeydown=(key)=>{
    if(key.code==="Space"){
        a.state=!a.state
    }
    if(key.code==="ArrowRight"){
        a=gun
    }
    if(key.code==="ArrowLeft"){
        a=normal
    }
}
let then,now,elapsed
const fps=10
const frameInterval=1000/fps
then=Date.now()


const render=()=>{
    requestAnimationFrame(render)
    now=Date.now()
    elapsed=now-then
    if(elapsed>frameInterval){
        ctx.clearRect(0,0,w,h)
        a.draw()
        then=now-elapsed%frameInterval
    }
}
render()