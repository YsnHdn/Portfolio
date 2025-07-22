import experiencesData from '@/data/experiencesData'
import ExperienceCard from '@/components/ExperienceCard'
import { genPageMetadata } from 'app/seo'
import AnimatedTitle from '@/components/AnimatedTitle'

export const metadata = genPageMetadata({ title: 'Experience' })

export default function Experience() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <AnimatedTitle
          title="Experience"
          description="My professional journey and work experience"
        />
        <div className="container py-12">
          <div className="space-y-16">
            {experiencesData.map((experience) => (
              <ExperienceCard
                key={`${experience.company}-${experience.position}`}
                {...experience}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
