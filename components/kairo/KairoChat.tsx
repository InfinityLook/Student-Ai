"use client";


import { useState } from "react";


export default function KairoChat(){


const [open,setOpen]=useState(false);


return (

<div>


<button

onClick={()=>setOpen(!open)}

className="
fixed
right-5
bottom-24
w-16
h-16
rounded-full
bg-cyan-500
text-3xl
shadow-xl
"

>

🤖

</button>



{
open &&

<div
className="
fixed
right-5
bottom-44
w-72
rounded-3xl
bg-black/80
border
border-white/10
p-5
backdrop-blur-xl
"

>


<h3 className="font-bold text-cyan-400">

Kairo

</h3>


<p className="text-gray-300 mt-3">

Ahoj, jak ti dnes můžu pomoct?

</p>


</div>

}


</div>

);


}
