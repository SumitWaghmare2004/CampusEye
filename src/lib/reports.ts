import { jsPDF } from 'jspdf';
import { supabase } from './supabase';
import { sendSMS } from './twilio';
import Swal from 'sweetalert2';

interface StudentReport {
  name: string;
  studentId: string;
  class: string;
  section: string;
  month: string;
  year: string;
  attendancePercentage: number;
  behaviorScore: number;
  warningCount: number;
}

export const generateStudentReport = async (studentId: string, month: string, year: string): Promise<string> => {
  try {
    // Fetch student details
    const { data: student } = await supabase
      .from('students')
      .select('*')
      .eq('id', studentId)
      .single();

    if (!student) throw new Error('Student not found');

    // Calculate attendance percentage
    const { data: attendance } = await supabase
      .from('attendance')
      .select('*')
      .eq('student_id', studentId)
      .gte('date', `${year}-${month}-01`)
      .lte('date', `${year}-${month}-31`);

    const totalDays = attendance?.length || 0;
    const presentDays = attendance?.filter(a => a.status === 'present').length || 0;
    const attendancePercentage = totalDays ? (presentDays / totalDays) * 100 : 0;

    // Get behavior tracking data
    const { data: behavior } = await supabase
      .from('behavior_tracking')
      .select('*')
      .eq('student_id', studentId)
      .gte('session_start', `${year}-${month}-01`)
      .lte('session_start', `${year}-${month}-31`);

    const behaviorScore = calculateBehaviorScore(behavior);

    // Get warnings
    const { data: warnings } = await supabase
      .from('warnings')
      .select('*')
      .eq('student_id', studentId)
      .gte('created_at', `${year}-${month}-01`)
      .lte('created_at', `${year}-${month}-31`);

    const report: StudentReport = {
      name: student.name,
      studentId: student.id,
      class: student.class,
      section: student.section,
      month,
      year,
      attendancePercentage,
      behaviorScore,
      warningCount: warnings?.length || 0,
    };

    return generatePDF(report);
  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
};

const calculateBehaviorScore = (behaviorData: any[] | null): number => {
  if (!behaviorData || behaviorData.length === 0) return 100;

  const totalSessions = behaviorData.length;
  const totalHeadDowns = behaviorData.reduce((sum, session) => sum + (session.head_down_count || 0), 0);
  
  // Deduct points for head down instances
  const deduction = (totalHeadDowns / totalSessions) * 10;
  return Math.max(0, Math.min(100, 100 - deduction));
};

const generatePDF = (report: StudentReport): string => {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.text('Student Monthly Report', 105, 20, { align: 'center' });
  
  // Add student details
  doc.setFontSize(12);
  doc.text(`Name: ${report.name}`, 20, 40);
  doc.text(`Student ID: ${report.studentId}`, 20, 50);
  doc.text(`Class: ${report.class} - Section: ${report.section}`, 20, 60);
  doc.text(`Report for: ${report.month}/${report.year}`, 20, 70);
  
  // Add performance metrics
  doc.setFontSize(14);
  doc.text('Performance Summary', 20, 90);
  
  doc.setFontSize(12);
  doc.text(`Attendance: ${report.attendancePercentage.toFixed(1)}%`, 30, 105);
  doc.text(`Behavior Score: ${report.behaviorScore.toFixed(1)}%`, 30, 115);
  doc.text(`Warnings Issued: ${report.warningCount}`, 30, 125);
  
  // Add footer
  doc.setFontSize(10);
  doc.text('This is an automatically generated report.', 105, 280, { align: 'center' });
  
  // For demo purposes, return a simulated URL
  return `https://example.com/reports/${report.studentId}_${report.month}_${report.year}.pdf`;
};

export const sendReportSMS = async (
  studentId: string,
  month: string,
  year: string,
  phoneNumber: string
): Promise<void> => {
  try {
    // Generate the report
    const reportUrl = await generateStudentReport(studentId, month, year);
    
    // Get student name
    const { data: student } = await supabase
      .from('students')
      .select('name')
      .eq('id', studentId)
      .single();

    if (!student) throw new Error('Student not found');

    // Construct the message
    const message = `Monthly Attendance Report for ${student.name} - ${month}/${year}\nView report: ${reportUrl}`;

    // Send SMS
    await sendSMS(phoneNumber, message);

    await Swal.fire({
      icon: 'success',
      title: 'Report Sent',
      text: `Report has been sent to ${phoneNumber}`,
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error('Error sending report:', error);
    throw error;
  }
};