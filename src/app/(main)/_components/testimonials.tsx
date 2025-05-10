import React from "react";

const Testimonial = ({
  quote,
  author,
  role,
  company,
}: {
  quote: string;
  author: string;
  role: string;
  company: string;
}) => (
  <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow animate-float">
    <div className="text-primary/20 text-5xl font-serif mb-4">"</div>
    <p className="text-foreground italic mb-4">{quote}</p>
    <div className="flex items-center mt-4">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        {author.charAt(0)}
      </div>
      <div className="ml-3">
        <div className="font-semibold">{author}</div>
        <div className="text-sm text-muted-foreground">
          {role}, {company}
        </div>
      </div>
    </div>
  </div>
);

export default Testimonial;
