import React from 'react'
import Layout from '../layout/layout'

const ExamsTips:React.FC = () => {
  const tips = [
  " 1- Organize your study time and take short breaks.",
  " 2- Review your notes and summaries instead of the whole book.",
  " 3- Practice past papers and sample questions.",
  " 4- Sleep well before the exam, don't stay up late cramming.",
  " 5- Stay hydrated and have a healthy breakfast on exam day.",
  " 6- Focus on understanding concepts, not just memorizing.",
  " 7- Stay calm and confident during the exam."
];
  return (
  <Layout>
 <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-6">Exams Tips</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow duration-200"
            >
              <p className="text-gray-700 text-lg">{tip}</p>
            </div>
          ))}
        </div>
      </div>  </Layout>
  )
}

export default ExamsTips
