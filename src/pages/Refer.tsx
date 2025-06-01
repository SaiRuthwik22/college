
import React from 'react';
import NewHeader from '@/components/NewHeader';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Share2, Mail, UserPlus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Refer = () => {
  const { toast } = useToast();
  const referralLink = 'https://joiningcollege.com/refer?id=YOUR_ID';
  const referralCode = 'JOIN2025';

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: message,
    });
  };

  const shareViaEmail = () => {
    const subject = 'Join this amazing educational platform';
    const body = `Hey! I thought you might be interested in this educational platform. Use my referral code ${referralCode} to sign up: ${referralLink}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NewHeader />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Refer a Friend</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Share your referral link</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-secondary p-4 rounded-lg flex items-center justify-between">
                <div className="text-sm overflow-hidden text-ellipsis">{referralLink}</div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => copyToClipboard(referralLink, 'Referral link copied to clipboard')}
                  className="flex-shrink-0 ml-2"
                >
                  <Copy size={16} className="mr-2" />
                  Copy
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  className="flex-1"
                  variant="outline" 
                  onClick={() => shareViaEmail()}
                >
                  <Mail size={16} className="mr-2" />
                  Email
                </Button>
                <Button 
                  className="flex-1"
                  variant="outline" 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Join EduPortal',
                        text: 'Check out this educational platform!',
                        url: referralLink,
                      });
                    } else {
                      copyToClipboard(referralLink, 'Referral link copied to clipboard');
                    }
                  }}
                >
                  <Share2 size={16} className="mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Referral Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-secondary p-4 rounded-lg flex items-center justify-between">
                <div className="text-xl font-bold tracking-wider">{referralCode}</div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => copyToClipboard(referralCode, 'Referral code copied to clipboard')}
                  className="flex-shrink-0 ml-2"
                >
                  <Copy size={16} className="mr-2" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-secondary/50 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <UserPlus size={32} className="text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">How it works</h3>
            <p className="text-muted-foreground">
              Share your unique referral link or code with friends. 
              When they sign up using your link, both of you will receive special benefits!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Refer;
