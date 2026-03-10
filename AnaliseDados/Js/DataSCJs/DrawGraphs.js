

class DrawGraphs{
    constructor(dados,id){

    }
    CreateBarsChars(data,id)
    {

    const svg = document.getElementById(id);
    const larguraBarra = 50;     
    const espacamento = 90;      
    const alturaMax = 250;      

    data.forEach((valor, i) => {

      const x = i * (larguraBarra + espacamento) + espacamento;
      const altura = (valor / Math.max(...data)) * alturaMax;
      const y = alturaMax - altura + 20;

      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", x);
      rect.setAttribute("y", y);
      rect.setAttribute("width", larguraBarra);
      rect.setAttribute("height", altura);
      rect.setAttribute("fill", "steelblue");
      svg.appendChild(rect);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", x + larguraBarra / 2);
      text.setAttribute("y", y - 5);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("font-size", "12");
      text.textContent = valor;
      svg.appendChild(text);
    })
    }
}

export {DrawGraphs}