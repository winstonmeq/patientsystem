'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    // Simulate a delay, like an API request
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Button
        variant="default"
        size="default"
        loading={isLoading}
        onClick={handleClick}
      >
        {isLoading ? "Loading..." : "Submit"}
      </Button>
    </div>
  );
}
