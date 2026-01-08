import React from 'react'
import { Sun, Droplets, Wind } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const WeatherCurrentCard = ({ weather }) => { 
  if (!weather) return null

  return (
    <Card className="relative overflow-hidden border-0 bg-linear-to-br from-chart-2 to-primary text-primary-foreground shadow-lg">
      <div className="absolute -right-5 -top-5 opacity-20">
        <Sun size={140} />
      </div>

      <CardContent className="relative z-10 flex min-h-55 flex-col justify-between p-6">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wider opacity-80">
            Current Weather
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-bold tracking-tighter">
              {Math.round(weather.temperature)}°
            </span>
            <span className="text-xl font-medium">{weather.condition}</span>
          </div>
          <p className="mt-1 text-sm opacity-90">
            Feels like {Math.round(weather.feelsLike)}°
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 rounded-lg bg-white/10 p-3 backdrop-blur-md">
            <Droplets className="h-5 w-5 text-accent" />
            <div>
              <p className="text-xs opacity-80">Humidity</p>
              <p className="font-semibold">{weather.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-white/10 p-3 backdrop-blur-md">
            <Wind className="h-5 w-5 text-accent" />
            <div>
              <p className="text-xs opacity-80">Wind</p>
              <p className="font-semibold">{weather.windSpeed} km/h</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherCurrentCard