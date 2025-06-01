
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { submitJoinCollegeForm } from '@/lib/api';

// Form validation schema
const joinFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, { message: "Please enter a valid phone number." }),
  tenthPercentage: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    },
    { message: "Please enter a valid percentage between 0 and 100." }
  ),
  twelfthPercentage: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    },
    { message: "Please enter a valid percentage between 0 and 100." }
  ),
  examName: z.string().min(1, { message: "Please specify the competitive exam." }),
  examScore: z.string().min(1, { message: "Please enter your exam score." }),
  interestedCourse: z.string().min(1, { message: "Please specify a course of interest." }),
});

export type JoinFormValues = z.infer<typeof joinFormSchema>;

interface JoinCollegeFormProps {
  collegeName: string;
  userId: string;
  onClose: () => void;
  onSuccess: (name: string) => void;
}

const JoinCollegeForm: React.FC<JoinCollegeFormProps> = ({ collegeName, userId, onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<JoinFormValues>({
    resolver: zodResolver(joinFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      tenthPercentage: "",
      twelfthPercentage: "",
      examName: "",
      examScore: "",
      interestedCourse: "",
    },
  });
  
  const onSubmit = async (data: JoinFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Map form data to API format
      const formPayload = {
        uid: userId,
        full_name: data.name,
        phone_number: data.phone,
        tweleth_per: data.twelfthPercentage,
        exam_score: data.examScore,
        email: data.email,
        tenth_per: data.tenthPercentage,
        competative_exam: data.examName,
        intrested_course: data.interestedCourse,
      };
      
      // Submit form data to API
      await submitJoinCollegeForm(formPayload);
      
      // Call success callback with name
      onSuccess(data.name);
      
      // Reset form
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="johndoe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1 555 123 4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="tenthPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>10th Percentage</FormLabel>
                <FormControl>
                  <Input placeholder="90.5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="twelfthPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>12th Percentage</FormLabel>
                <FormControl>
                  <Input placeholder="92.0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="examName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Competitive Exam</FormLabel>
                <FormControl>
                  <Input placeholder="SAT, ACT, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="examScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exam Score</FormLabel>
                <FormControl>
                  <Input placeholder="1500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="interestedCourse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interested Course</FormLabel>
                <FormControl>
                  <Input placeholder="Computer Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end gap-3 pt-3">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default JoinCollegeForm;
