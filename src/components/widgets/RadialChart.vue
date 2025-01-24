<script setup lang="ts">
import * as d3 from 'd3'
import { onMounted, ref, watch } from 'vue'

// defineProps({
//
//   title?: String,
// })

const props = defineProps<{
  // data?: {
  //   label: string
  //   value: number
  // }
  title?: String
}>()

// Datos del gráfico
const data = [
  { label: 'Savings', value: 40 },
  { label: 'Investments', value: 30 },
  { label: 'Crypto', value: 20 },
  { label: 'Others', value: 10 },
]

// Referencia para el contenedor SVG
const chartRef = ref<SVGSVGElement | null>(null)
const colorScale = ref(d3.scaleOrdinal(d3.schemeTableau10)) // Escala de colores

const renderChart = () => {
  const svg = d3.select(chartRef.value)
  const width = 200
  const height = 200
  const radius = Math.min(width, height) / 2

  // Limpia el contenido del SVG (si se vuelve a renderizar)
  svg.selectAll('*').remove()

  // Configura el gráfico
  const color = colorScale.value // Reutilizamos la escala de colores
  const pie = d3.pie<{ label: string; value: number }>().value((d) => d.value)
  const arc = d3
    .arc<d3.PieArcDatum<{ label: string; value: number }>>()
    .innerRadius(0)
    .outerRadius(radius)

  const pieData = pie(data)

  // Grupo principal para centrar el gráfico
  const g = svg
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

  // Dibuja los arcos
  g.selectAll('path')
    .data(pieData)
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', (d) => color(d.data.label))
    .attr('stroke', 'white')
    .style('stroke-width', '2px')

  // Agrega etiquetas dentro del gráfico
  g.selectAll('text')
    .data(pieData)
    .enter()
    .append('text')
    .text((d) => ` ${d.data.value}%`)
    .attr('transform', (d) => `translate(${arc.centroid(d)})`)
    .style('text-anchor', 'middle')
    .style('font-size', '12px')
    .style('fill', 'white')
}

onMounted(renderChart)

// Vuelve a renderizar si cambian los datos
watch(() => data, renderChart, { deep: true })
</script>

<template>
  <div class="bg-terciary p-4 rounded-lg shadow-md">
    <div class="bg-sky-950 p-4 rounded-lg">
      <h2 class="text-lg font-semibold mb-4 text-center">{{ title }}</h2>
      <div class="flex space-x-2 items-center">
        <!-- Gráfico de torta -->
        <svg ref="chartRef"></svg>

        <!-- Lista de referencias -->
        <ul class="space-y-2">
          <li v-for="(item, index) in data" :key="item.label" class="flex items-center space-x-2">
            <!-- Cuadrado del color -->
            <div class="w-4 h-4 rounded" :style="{ backgroundColor: colorScale(item.label) }"></div>
            <!-- Etiqueta -->
            <span class="text-sm">{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
