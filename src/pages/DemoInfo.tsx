import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Coffee, Linkedin, Globe, ArrowLeft, Sparkles } from 'lucide-react';

export const DemoInfo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/shutterstock_2599873053.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Main Card */}
        <Card className="p-8 md:p-12">
          <div className="text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#FFB800] to-[#FF8C00] mb-6">
              <Coffee className="w-10 h-10 text-white" />
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#0A1628] mb-4">
              Plot Twist! <Sparkles className="inline w-8 h-8 text-[#FFB800]" />
            </h1>

            <p className="text-xl text-[#64748B] mb-6">
              This is actually a demo site...
            </p>

            {/* Message */}
            <div className="bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-lg p-6 mb-8 text-left">
              <p className="text-[#0A1628] leading-relaxed mb-4">
                While I'd love to approve your £500k bridging loan in the next 3 minutes using AI magic ✨,
                this is actually a demonstration project I built for an interview process.
              </p>
              <p className="text-[#0A1628] leading-relaxed mb-4">
                The good news? You can still explore the full application journey by signing in with the demo credentials.
              </p>
              <p className="text-[#64748B] text-sm">
                <strong className="text-[#0A1628]">Want to connect?</strong> Check out my work or get in touch below!
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a
                href="https://linkedin.com/in/pjamieson"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button variant="primary" icon={<Linkedin />}>
                  Connect on LinkedIn
                </Button>
              </a>

              <a
                href="https://jamieson.digital"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button variant="secondary" icon={<Globe />}>
                  Visit My Website
                </Button>
              </a>
            </div>

            {/* Back Button */}
            <div className="pt-6 border-t border-[#E2E8F0]">
              <Button
                variant="ghost"
                icon={<ArrowLeft />}
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#64748B]">
            Built with React, TypeScript, Tailwind CSS v4, and a healthy dose of caffeine ☕
          </p>
        </div>
      </div>
    </div>
  );
};
