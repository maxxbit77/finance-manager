<script setup lang="ts">
import * as d3 from 'd3'
import { ref, onMounted } from 'vue'

const chartRef = ref<SVGSVGElement | null>(null)

// Parámetros del gráfico
const width = 300
const height = 200
const needleValue = 75 // Valor del indicador (0-100)

// Función para renderizar el gráfico
const renderGauge = () => {
  const radius = Math.min(width, height) / 2
  const arcWidth = 20
  const totalSections = [
    { label: 'Venta fuerte', color: '#E53935', start: 0, end: 20 },
    { label: 'Venta', color: '#FB8C00', start: 20, end: 40 },
    { label: 'Neutral', color: '#CCCCCC', start: 40, end: 60 },
    { label: 'Compra', color: '#43A047', start: 60, end: 80 },
    { label: 'Compra fuerte', color: '#1E88E5', start: 80, end: 100 },
  ]

  // Selecciona el SVG y limpia cualquier contenido previo
  const svg = d3.select(chartRef.value)
  svg.selectAll('*').remove()

  // Grupo principal
  const g = svg
    .attr('viewBox', `0 0 ${width} ${height}`)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height})`)

  // Escala para la aguja
  const scale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([-Math.PI / 2, Math.PI / 2])

  // Arcos para las secciones
  const arc = d3
    .arc()
    .innerRadius(radius - arcWidth)
    .outerRadius(radius)

  totalSections.forEach((section) => {
    g.append('path')
      .datum({
        startAngle: scale(section.start),
        endAngle: scale(section.end),
      })
      .attr('d', arc as any)
      .attr('fill', section.color)
  })

  // Aguja
  const needleLength = radius - arcWidth - 10
  const needleAngle = scale(needleValue)

  g.append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', needleLength * Math.cos(needleAngle))
    .attr('y2', needleLength * Math.sin(needleAngle))
    .attr('stroke', '#333')
    .attr('stroke-width', 3)

  // Pivote
  g.append('circle').attr('cx', 0).attr('cy', 0).attr('r', 5).attr('fill', '#333')

  // Etiquetas de texto
  totalSections.forEach((section) => {
    const angle = scale((section.start + section.end) / 2)
    const x = (radius - arcWidth - 15) * Math.cos(angle)
    const y = (radius - arcWidth - 15) * Math.sin(angle)
    g.append('text')
      .attr('x', x)
      .attr('y', y)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', '10px')
      .text(section.label)
  })
}

onMounted(renderGauge)
</script>

<template>
  <div class="bg-sky-950 p-2 rounded-lg shadow-md">
    <h2 class="text-lg font-semibold text-center">Técnico</h2>
    <svg ref="chartRef" class="w-full h-auto"></svg>
  </div>
</template>

<style scoped>
svg {
  font-family: sans-serif;
}
</style>
