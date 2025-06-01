
import React from 'react';
import NewHeader from '@/components/NewHeader';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NewHeader />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Terms and Conditions</h1>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
                  <p className="text-muted-foreground mb-3">
                    Welcome to EduPortal. These Terms and Conditions govern your use of our website and services. 
                    By accessing or using EduPortal, you agree to be bound by these Terms.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">2. Definitions</h2>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li><strong>"Service"</strong> refers to the EduPortal website and platform.</li>
                    <li><strong>"User"</strong> refers to any individual accessing or using the Service.</li>
                    <li><strong>"Content"</strong> includes text, images, videos, and other materials on the Service.</li>
                  </ul>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
                  <p className="text-muted-foreground mb-3">
                    When you create an account with us, you must provide accurate and complete information.
                    You are responsible for safeguarding your account and for any activities or actions under your account.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">4. Privacy Policy</h2>
                  <p className="text-muted-foreground mb-3">
                    Our Privacy Policy describes how we handle your personal information when you use our Service.
                    By using EduPortal, you agree to our collection and use of information in accordance with this policy.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">5. Content</h2>
                  <p className="text-muted-foreground mb-3">
                    Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the Content that you post on or through the Service.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">6. Prohibited Uses</h2>
                  <p className="text-muted-foreground mb-2">You agree not to use the Service to:</p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe the intellectual property rights of others</li>
                    <li>Transmit harmful code or malware</li>
                    <li>Collect user data without permission</li>
                    <li>Impersonate others or misrepresent your affiliation</li>
                  </ul>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">7. Termination</h2>
                  <p className="text-muted-foreground mb-3">
                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including breach of these Terms.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">8. Changes</h2>
                  <p className="text-muted-foreground mb-3">
                    We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
                  <p className="text-muted-foreground">
                    If you have any questions about these Terms, please contact us at support@joiningcollege.com.
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>Last updated: May 14, 2025</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
