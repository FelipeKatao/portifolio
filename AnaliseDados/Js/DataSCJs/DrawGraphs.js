

class DrawGraphs{
    constructor(dados,id){

    }
  drawLineChart(containerId, values){

  const width = 600
  const height = 300
  const padding = 40

  const max = Math.max(...values)
  const stepX = (width - padding * 2) / (values.length - 1)

  const container = document.getElementById(containerId)

  const svg = document.createElementNS("http://www.w3.org/2000/svg","svg")
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`)
  svg.setAttribute("width","100%")

  
  // eixo X
  const axisX = document.createElementNS("http://www.w3.org/2000/svg","line")
  axisX.setAttribute("x1", padding)
  axisX.setAttribute("y1", height - padding)
  axisX.setAttribute("x2", width - padding)
  axisX.setAttribute("y2", height - padding)
  axisX.setAttribute("stroke","black")

  // eixo Y
  const axisY = document.createElementNS("http://www.w3.org/2000/svg","line")
  axisY.setAttribute("x1", padding)
  axisY.setAttribute("y1", padding)
  axisY.setAttribute("x2", padding)
  axisY.setAttribute("y2", height - padding)
  axisY.setAttribute("stroke","black")

  svg.appendChild(axisX)
  svg.appendChild(axisY)

  // gerar pontos
  let points = ""

  values.forEach((value,i)=>{

    const x = padding + stepX * i
    const y = height - padding - (value/max)*(height-padding*2)

    points += `${x},${y} `
    const text = document.createElementNS("http://www.w3.org/2000/svg","text")
    const circle = document.createElementNS("http://www.w3.org/2000/svg","circle")
    circle.setAttribute("cx",x)
    circle.setAttribute("cy",y)
    circle.setAttribute("r",4)
    circle.setAttribute("fill","blue")
    if(value == 60){
        circle.setAttribute("opacity","0.5")
    }
    text.textContent = value
    text.setAttribute("x",x)
    text.setAttribute("y",y-10)
    text.setAttribute("text-anchor","middle")
    text.setAttribute("font-size","12")
    svg.appendChild(circle)
    svg.appendChild(text)

  })

  // linha do gráfico
  const polyline = document.createElementNS("http://www.w3.org/2000/svg","polyline")
  polyline.setAttribute("points",points.trim())
  polyline.setAttribute("fill","none")
  polyline.setAttribute("stroke","blue")
  polyline.setAttribute("stroke-width","2")

  svg.appendChild(polyline)

  container.innerHTML=""
  container.appendChild(svg)
}

drawPieChart(containerId, values){

  const size = 300
  const radius = 120
  const center = size/2

  const total = values.reduce((a,b)=>a+b,0)

  const svg = document.createElementNS("http://www.w3.org/2000/svg","svg")
  svg.setAttribute("viewBox",`0 0 ${size} ${size}`)
  svg.setAttribute("width","100%")

  const colors = ["#4CAF50","#2196F3","#FFC107","#F44336","#9C27B0"]

  let startAngle = 0

  values.forEach((value,i)=>{

    const sliceAngle = (value/total) * Math.PI * 2
    const endAngle = startAngle + sliceAngle

    const x1 = center + radius * Math.cos(startAngle)
    const y1 = center + radius * Math.sin(startAngle)

    const x2 = center + radius * Math.cos(endAngle)
    const y2 = center + radius * Math.sin(endAngle)

    const largeArc = sliceAngle > Math.PI ? 1 : 0

    const pathData = `
      M ${center} ${center}
      L ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
      Z
    `

    const path = document.createElementNS("http://www.w3.org/2000/svg","path")

    path.setAttribute("d",pathData)
    path.setAttribute("fill",colors[i % colors.length])
    
    svg.appendChild(path)

    startAngle = endAngle

  })

  const container = document.getElementById(containerId)
  container.innerHTML=""
  container.appendChild(svg)

}

drawCard(containerId, title, value, subtitle,opration, bgColor="white", textColor="gray"){

 const container = document.getElementById(containerId)
 let total= 0 

 if(opration == "sum"){
  value.forEach(s =>{
     total+=s 
   })
   value = total
 }

 const svgNS = "http://www.w3.org/2000/svg"

 const svg = document.createElementNS(svgNS,"svg")

 // espaço interno de desenho
 const W = 300
 const H = 150

 svg.setAttribute("viewBox",`0 0 ${W} ${H}`)
 svg.setAttribute("width","100%")
 svg.setAttribute("height","100%")
 svg.setAttribute("preserveAspectRatio","xMidYMid meet")

 // fundo / borda
 const rect = document.createElementNS(svgNS,"rect")

 rect.setAttribute("x",10)
 rect.setAttribute("y",-80)
 rect.setAttribute("width",W-10)
 rect.setAttribute("height",H-10)

 rect.setAttribute("rx",12)

 rect.setAttribute("fill",bgColor)
 rect.setAttribute("stroke","#ddd")
 rect.setAttribute("stroke-width","2")

 svg.appendChild(rect)

 // titulo
 const titleText = document.createElementNS(svgNS,"text")

 titleText.textContent = title
 titleText.setAttribute("x",140)
 titleText.setAttribute("y",-50)

 titleText.setAttribute("font-size","14")
 titleText.setAttribute("fill",textColor)

 svg.appendChild(titleText)

 // valor principal
 const valueText = document.createElementNS(svgNS,"text")

 valueText.textContent = value

 valueText.setAttribute("x",W/2)
 valueText.setAttribute("y",1)

 valueText.setAttribute("font-size","40")
 valueText.setAttribute("font-weight","bold")

 valueText.setAttribute("text-anchor","middle")
 valueText.setAttribute("fill",textColor)

 svg.appendChild(valueText)

 // subtitulo
 const subText = document.createElementNS(svgNS,"text")

 subText.textContent = subtitle

 subText.setAttribute("x",W/2)
 subText.setAttribute("y",20)

 subText.setAttribute("font-size","13")
 subText.setAttribute("text-anchor","middle")

 subText.setAttribute("fill",textColor)
 subText.setAttribute("opacity","0.7")

 svg.appendChild(subText)

 container.innerHTML = ""
 container.appendChild(svg)

}
drawScatterChart(containerId, points){

  const width = 600
  const height = 300
  const padding = 40

  const container = document.getElementById(containerId)

  const maxX = Math.max(...points.map(p=>p.x))
  const maxY = Math.max(...points.map(p=>p.y))

  const svg = document.createElementNS("http://www.w3.org/2000/svg","svg")
  svg.setAttribute("viewBox",`0 0 ${width} ${height}`)
  svg.setAttribute("width","100%")

  // eixo X
  const axisX = document.createElementNS("http://www.w3.org/2000/svg","line")
  axisX.setAttribute("x1",padding)
  axisX.setAttribute("y1",height-padding)
  axisX.setAttribute("x2",width-padding)
  axisX.setAttribute("y2",height-padding)
  axisX.setAttribute("stroke","black")

  // eixo Y
  const axisY = document.createElementNS("http://www.w3.org/2000/svg","line")
  axisY.setAttribute("x1",padding)
  axisY.setAttribute("y1",padding)
  axisY.setAttribute("x2",padding)
  axisY.setAttribute("y2",height-padding)
  axisY.setAttribute("stroke","black")

  svg.appendChild(axisX)
  svg.appendChild(axisY)

  points.forEach(p=>{

    const x = padding + (p.x/maxX) * (width-padding*2)
    const y = height-padding - (p.y/maxY) * (height-padding*2)

    const circle = document.createElementNS("http://www.w3.org/2000/svg","circle")

    circle.setAttribute("cx",x)
    circle.setAttribute("cy",y)
    circle.setAttribute("r",5)
    circle.setAttribute("fill","#2196F3")

    svg.appendChild(circle)

  })

  container.innerHTML=""
  container.appendChild(svg)

}

drawBarChart(containerId, values){

  const width = 600
  const height = 300
  const padding = 40

  const container = document.getElementById(containerId)
  const max = Math.max(...values)

  const barWidth = (width - padding * 2) / values.length

  const svg = document.createElementNS("http://www.w3.org/2000/svg","svg")
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`)
  svg.setAttribute("width","100%")

  // eixo X
  const axisX = document.createElementNS("http://www.w3.org/2000/svg","line")
  axisX.setAttribute("x1", padding)
  axisX.setAttribute("y1", height - padding)
  axisX.setAttribute("x2", width - padding)
  axisX.setAttribute("y2", height - padding)
  axisX.setAttribute("stroke","black")

  // eixo Y
  const axisY = document.createElementNS("http://www.w3.org/2000/svg","line")
  axisY.setAttribute("x1", padding)
  axisY.setAttribute("y1", padding)
  axisY.setAttribute("x2", padding)
  axisY.setAttribute("y2", height - padding)
  axisY.setAttribute("stroke","black")

  svg.appendChild(axisX)
  svg.appendChild(axisY)

  values.forEach((value,i)=>{

    const barHeight = (value/max)*(height - padding*2)

    const x = padding + i * barWidth
    const y = height - padding - barHeight

    const rect = document.createElementNS("http://www.w3.org/2000/svg","rect")

    rect.setAttribute("x",x + 5)
    rect.setAttribute("y",y)
    rect.setAttribute("width",barWidth - 10)
    rect.setAttribute("height",barHeight)

    rect.setAttribute("fill","#4CAF50")

    svg.appendChild(rect)

  })

  container.innerHTML=""
  container.appendChild(svg)

}

}

export {DrawGraphs}