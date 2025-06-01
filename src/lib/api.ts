
// API utility functions for college-related operations

/**
 * Submits the join college form data to the API
 * @param formData The form data to submit
 * @returns Promise with the response data
 */
export async function submitJoinCollegeForm(formData: {
  uid: string;
  full_name: string;
  phone_number: string;
  tweleth_per: string;
  exam_score: string;
  email: string;
  tenth_per: string;
  competative_exam: string;
  intrested_course: string;
}) {
  try {
    const response = await fetch('https://apicollegerepo.lytortech.com/api/join-college', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit form');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting join college form:', error);
    throw error;
  }
}
