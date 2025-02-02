<script setup lang="ts">
import * as d3 from 'd3'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  data?: {
    label: string
    value: number
  }
  title?: String
}>()

const data = [
  { date: new Date(2012, 0, 1), value: 1500 },
  { date: new Date(2013, 0, 1), value: 1700 },
  { date: new Date(2014, 0, 1), value: 2000 },
  { date: new Date(2015, 0, 1), value: 2200 },
  { date: new Date(2016, 0, 1), value: 2400 },
  { date: new Date(2017, 0, 1), value: 2700 },
  { date: new Date(2018, 0, 1), value: 2500 },
  { date: new Date(2019, 0, 1), value: 3000 },
  { date: new Date(2020, 0, 1), value: 3500 },
  { date: new Date(2021, 0, 1), value: 4000 },
  { date: new Date(2022, 0, 1), value: 4500 },
  { date: new Date(2023, 0, 1), value: 5000 },
  { date: new Date(2024, 0, 1), value: 6000 },
  { date: new Date(2025, 0, 1), value: 6120 },
]

const chartRef = ref<SVGSVGElement | null>(null)

const renderChart = () => {
  const svg = d3.select(chartRef.value)
  const margin = { top: 20, right: 30, bottom: 30, left: 40 }
  const width = 800 - margin.left - margin.right
  const height = 400 - margin.top - margin.bottom

  svg.selectAll('*').remove()

  // Escalas
  const x = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.date) as [Date, Date])
    .range([0, width])

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)!])
    .nice()
    .range([height, 0])

  // Área
  const area = d3
    .area<{ date: Date; value: number }>()
    .x((d) => x(d.date))
    .y0(height)
    .y1((d) => y(d.value))
    .curve(d3.curveMonotoneX)

  // Ejes
  const xAxis = d3.axisBottom<Date>(x).ticks(10).tickFormat(d3.timeFormat('%Y'))
  const yAxis = d3.axisLeft<number>(y)

  // Añade el grupo principal al SVG
  const g = svg
    .attr(
      'viewBox',
      `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`,
    )
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  // Dibuja el área
  g.append('path').datum(data).attr('fill', 'steelblue').attr('opacity', 0.4).attr('d', area)

  // Dibuja la línea sobre el área
  const line = d3
    .line<{ date: Date; value: number }>()
    .x((d) => x(d.date))
    .y((d) => y(d.value))
    .curve(d3.curveMonotoneX)

  g.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr('d', line)

  // Dibuja los ejes
  g.append('g').attr('transform', `translate(0,${height})`).call(xAxis)

  g.append('g').call(yAxis)

  // Etiquetas de ejes
  g.append('text')
    .attr('x', -height / 2)
    .attr('y', -margin.left + 10)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .attr('fill', '#fff')
    .text('Value')

  g.append('text')
    .attr('x', width / 2)
    .attr('y', height + margin.bottom - 5)
    .attr('text-anchor', 'middle')
    .attr('fill', '#fff')
    .text('Year')
}

onMounted(renderChart)
</script>

<template>
  <div class="bg-sky-950 p-4 rounded-lg shadow-md">
    <h2 class="text-lg font-semibold mb-4 text-center">{{ title }}</h2>
    <svg ref="chartRef" class="w-full h-auto"></svg>
  </div>
</template>

<style scoped>
svg {
  font-family: sans-serif;
  color: white;
}
</style>
