<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="12" class="card-box">
        <el-card>
          <div slot="header"><span><i class="el-icon-pie-chart"></i> 财务统计</span></div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div ref="commandstats" style="height: 420px" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import { getfr } from '../../../api/fr/finance_sys'
export default {
  name: 'CommandStatsHorizontalBar',
   data() {
    return {
      money: 0,
      count: 0
    }
  },
  mounted() {
     this.loadData().then(() => {
      this.initHorizontalBarChart()
    })
    window.addEventListener('resize', this.handleChartResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleChartResize)
  },
  methods: {
    async loadData() {
      try {
        const res = await getfr()
        this.money = res.data.reduce((sum, item) => sum + (item.amount || 0), 0)
        this.count = res.data.length
      } catch (error) {
        this.money = 0
        this.count = 0
      }
    },
    initHorizontalBarChart() {
      
      const chartDom = this.$refs.commandstats
      const myChart = echarts.init(chartDom)
      const chartData = {
        commandTypes: ['财务总金额', '财务个数'],
        Count: [this.money, this.count],
      }

      const option = {
        title: {
          text: '近30天命令调用统计',
          left: 'left',
          textStyle: {
            fontSize: 14,
            color: '#666'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: (params) => {
            const commandType = params[0].name
            return `
              <div style="text-align: left;">
                <p>命令类型：${commandType}</p>
              </div>
            `
          }
        },
        legend: {
          data: ['调用次数'],
          top: 30,
          right: 20,
          textStyle: {
            fontSize: 12,
            color: '#666'
          }
        },
        grid: {
          left: '15%',  // 左侧留出更多空间显示命令名称
          right: '8%',
          bottom: '3%',
          containLabel: true
        },
        // 横向条形图核心：X轴为数值，Y轴为类目
        xAxis: {
          type: 'value',
          nameTextStyle: {
            color: '#888',
            fontSize: 12
          },
          axisLabel: {
            textStyle: {
              color: '#888',
              fontSize: 12
            }
          },
          axisLine: {
            lineStyle: {
              color: '#eee'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#f5f5f5'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: chartData.commandTypes,
          axisLabel: {
            textStyle: {
              color: '#666',
              fontSize: 12
            }
          },
          axisLine: {
            lineStyle: {
              color: '#eee'
            }
          }
        },
        series: [
          {
            type: 'bar',
            data: chartData.Count,
            barWidth: 25,
            itemStyle: {
              color: '#409EFF'
            },
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#666',
                fontSize: 11
              }
            }
          }
        ],
        media: [
          {
            query: { maxWidth: 768 },
            option: {
              grid: { left: '20%' },
              legend: { top: 10 },
              series: [{ barWidth: 18 }, { barWidth: 18 }]
            }
          }
        ]
      }

      myChart.setOption(option)
      this.commandChart = myChart
    },

    handleChartResize() {
      if (this.commandChart) {
        this.commandChart.resize()
      }
    }
  }
}

</script>