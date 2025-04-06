// Mock Twilio functionality for frontend
export const sendSMS = async (to: string, message: string): Promise<void> => {
  try {
    // In a real application, this would make an API call to your backend
    console.log('Simulating SMS send:', { to, message });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, always succeed
    return Promise.resolve();
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};