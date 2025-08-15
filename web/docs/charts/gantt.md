## Gantt Chart

A Gantt chart is a visual project management tool that displays a
project's schedule as a series of horizontal bars. These bars
represent the start and end dates of tasks, allowing for easy tracking
of progress and dependencies.

Here's a simple exampe of a Gantt chart:

~~~html
<gantt
  data='[
    { "task": "Planning", "start": "2024-03-01", "end": "2024-03-05" },
    { "task": "Design", "start": "2024-03-06", "end": "2024-03-12" },
    { "task": "Development", "start": "2024-03-13", "end": "2024-03-25" },
    { "task": "Testing", "start": "2024-03-26", "end": "2024-03-30" },
    { "task": "Deployment", "start": "2024-03-31", "end": "2024-04-02" }
  ]'
  size='{"width":1000,"height":500}'
  colors='deep'
>
</gantt>
~~~

which produces the following chart:

<span class="chart-container" id="gantt_0"></span>

<script>
 setTimeout(() => {
  Promise.resolve().then(() => {
    Doodl.gantt('#gantt_0',[
      { "task": "Planning", "start": "2024-03-01", "end": "2024-03-05" },
      { "task": "Design", "start": "2024-03-06", "end": "2024-03-12" },
      { "task": "Development", "start": "2024-03-13", "end": "2024-03-25" },
      { "task": "Testing", "start": "2024-03-26", "end": "2024-03-30" },
      { "task": "Deployment", "start": "2024-03-31", "end": "2024-04-02" }
    ],{"width":1000,"height":500},{},['#4C72B0', '#DD8452', '#55A868', '#C44E52', '#8172B3', '#937860', '#DA8BC3', '#8C8C8C', '#CCB974', '#64B5CD']);
})}, 1000)
</script>

    
