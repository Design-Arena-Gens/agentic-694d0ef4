'use client'

import { useState } from 'react'
import styles from './page.module.css'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Appointment {
  id: string
  patientName: string
  time: string
  doctor: string
  department: string
  status: 'scheduled' | 'checked-in' | 'completed'
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! Welcome to St. Mary\'s Hospital. I\'m your virtual reception assistant. How can I help you today? I can assist with:\n\n• Scheduling appointments\n• Checking in for appointments\n• Finding departments and doctors\n• Providing directions\n• Emergency assistance'
    }
  ])
  const [input, setInput] = useState('')
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: '1', patientName: 'John Smith', time: '10:00 AM', doctor: 'Dr. Johnson', department: 'Cardiology', status: 'scheduled' },
    { id: '2', patientName: 'Sarah Williams', time: '11:30 AM', doctor: 'Dr. Patel', department: 'Orthopedics', status: 'checked-in' },
    { id: '3', patientName: 'Mike Brown', time: '2:00 PM', doctor: 'Dr. Lee', department: 'General Medicine', status: 'scheduled' },
  ])
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const response = generateResponse(input.toLowerCase())
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsTyping(false)
    }, 1000)
  }

  const generateResponse = (input: string): string => {
    if (input.includes('appointment') && input.includes('schedule')) {
      return 'I\'d be happy to help you schedule an appointment. Please provide:\n\n1. Your full name\n2. Preferred date and time\n3. Which department or doctor you\'d like to see\n4. Reason for visit\n\nYou can also call us at (555) 123-4567 for immediate scheduling.'
    }

    if (input.includes('check in') || input.includes('check-in')) {
      return 'To check in for your appointment, please provide:\n\n• Your full name\n• Appointment time\n\nOr you can use our kiosk in the main lobby. Don\'t forget to bring your ID and insurance card!'
    }

    if (input.includes('emergency') || input.includes('urgent')) {
      return '🚨 For medical emergencies, please:\n\n• Call 911 immediately, OR\n• Go directly to our Emergency Department entrance (East Wing, Ground Floor)\n\nThe Emergency Department is open 24/7. If this is not an emergency, I can help you schedule an urgent care appointment.'
    }

    if (input.includes('directions') || input.includes('where') || input.includes('location')) {
      return 'Our main hospital is located at:\n📍 123 Medical Center Drive, City, ST 12345\n\nDepartment locations:\n• Emergency: East Wing, Ground Floor\n• Radiology: West Wing, 1st Floor\n• Cardiology: North Tower, 3rd Floor\n• Orthopedics: South Wing, 2nd Floor\n• Laboratory: Main Building, Ground Floor\n\nParking is available in the multi-level garage (Lot A) with validation at reception.'
    }

    if (input.includes('doctor') || input.includes('physician')) {
      return 'We have excellent physicians across all specialties:\n\n• Dr. Johnson - Cardiology\n• Dr. Patel - Orthopedics\n• Dr. Lee - General Medicine\n• Dr. Martinez - Pediatrics\n• Dr. Chen - Surgery\n\nWould you like to schedule an appointment with a specific doctor or department?'
    }

    if (input.includes('hours') || input.includes('open')) {
      return 'Hospital Hours:\n\n🏥 Emergency Department: 24/7\n🏥 Main Reception: 6:00 AM - 8:00 PM\n🏥 Outpatient Clinics: 8:00 AM - 6:00 PM (Mon-Fri)\n🏥 Laboratory: 7:00 AM - 7:00 PM\n🏥 Pharmacy: 8:00 AM - 8:00 PM\n\nSome departments have extended hours. Would you like information about a specific department?'
    }

    if (input.includes('insurance') || input.includes('payment')) {
      return 'We accept most major insurance plans including:\n\n• Medicare/Medicaid\n• Blue Cross Blue Shield\n• United Healthcare\n• Aetna\n• Cigna\n\nWe also offer payment plans for self-pay patients. Please bring your insurance card to your appointment. For billing questions, contact our Financial Services at (555) 123-4568.'
    }

    if (input.includes('covid') || input.includes('test')) {
      return 'COVID-19 Services:\n\n✓ Testing available daily 8 AM - 4 PM\n✓ Vaccination clinic on 2nd Floor\n✓ No appointment needed for testing\n✓ Results in 24-48 hours\n\nPlease wear a mask in all clinical areas. Visitor policies may vary by department.'
    }

    if (input.includes('thank')) {
      return 'You\'re welcome! Is there anything else I can help you with today?'
    }

    if (input.includes('hello') || input.includes('hi')) {
      return 'Hello! How can I assist you today?'
    }

    return 'I can help you with:\n\n• Scheduling and managing appointments\n• Checking in for your visit\n• Finding departments and doctors\n• Getting directions\n• Insurance and billing questions\n• Emergency services\n\nWhat would you like to know more about?'
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickActions = [
    '📅 Schedule appointment',
    '✓ Check in',
    '🏥 Find department',
    '🚨 Emergency help'
  ]

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.hospitalLogo}>
            <div className={styles.logoIcon}>🏥</div>
            <div>
              <h1>St. Mary's Hospital</h1>
              <p>Virtual Reception Assistant</p>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.chatSection}>
            <div className={styles.messagesContainer}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${styles.message} ${
                    message.role === 'user' ? styles.userMessage : styles.assistantMessage
                  }`}
                >
                  <div className={styles.messageAvatar}>
                    {message.role === 'user' ? '👤' : '🤖'}
                  </div>
                  <div className={styles.messageContent}>
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className={`${styles.message} ${styles.assistantMessage}`}>
                  <div className={styles.messageAvatar}>🤖</div>
                  <div className={styles.messageContent}>
                    <div className={styles.typingIndicator}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.quickActions}>
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className={styles.quickActionBtn}
                  onClick={() => setInput(action)}
                >
                  {action}
                </button>
              ))}
            </div>

            <div className={styles.inputContainer}>
              <textarea
                className={styles.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question here..."
                rows={2}
              />
              <button
                className={styles.sendButton}
                onClick={handleSend}
                disabled={!input.trim()}
              >
                Send ➤
              </button>
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.infoCard}>
              <h3>📋 Today's Appointments</h3>
              <div className={styles.appointmentsList}>
                {appointments.map((apt) => (
                  <div key={apt.id} className={styles.appointmentItem}>
                    <div className={styles.appointmentHeader}>
                      <strong>{apt.patientName}</strong>
                      <span className={`${styles.status} ${styles[apt.status]}`}>
                        {apt.status === 'checked-in' ? '✓' : apt.status === 'completed' ? '✓✓' : '○'}
                      </span>
                    </div>
                    <div className={styles.appointmentDetails}>
                      <div>🕐 {apt.time}</div>
                      <div>👨‍⚕️ {apt.doctor}</div>
                      <div>🏥 {apt.department}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.infoCard}>
              <h3>ℹ️ Quick Info</h3>
              <div className={styles.quickInfo}>
                <div className={styles.infoItem}>
                  <strong>Emergency:</strong> East Wing
                </div>
                <div className={styles.infoItem}>
                  <strong>Phone:</strong> (555) 123-4567
                </div>
                <div className={styles.infoItem}>
                  <strong>Hours:</strong> 24/7 Emergency
                </div>
                <div className={styles.infoItem}>
                  <strong>Parking:</strong> Lot A (Validated)
                </div>
              </div>
            </div>

            <div className={styles.infoCard}>
              <h3>🏥 Departments</h3>
              <div className={styles.departmentsList}>
                <div>• Cardiology - 3rd Floor</div>
                <div>• Orthopedics - 2nd Floor</div>
                <div>• Radiology - 1st Floor</div>
                <div>• Laboratory - Ground Floor</div>
                <div>• Pediatrics - 4th Floor</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
