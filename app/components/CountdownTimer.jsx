"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function CountdownTimer({ competitionData }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);
  const [isBeforeStart, setIsBeforeStart] = useState(false);
  const timerRef = useRef(null);

  // Convert date string to timestamp
  // Dates from database are already in UTC format (e.g., "2025-10-27 11:00:00+00")
  const getTimeStamp = (dateString) => {
    if (!dateString) return null;
    
    // Parse the date string (ISO format from database)
    // Database stores times in UTC, so just parse directly
    const date = new Date(dateString);
    
    return date.getTime();
  };

  // Calculate time remaining
  const calculateTimeLeft = (targetTime) => {
    if (!targetTime) return null;

    const now = new Date().getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalMs: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      totalMs: difference,
    };
  };

  // Update countdown every second
  useEffect(() => {
    if (!competitionData) return;

    // Calculate which time to countdown to
    const getTargetTime = () => {
      const now = new Date().getTime();
      
      // Get timestamps (dates from database are already in UTC)
      const startTime = getTimeStamp(competitionData.start_date);
      const endTime = getTimeStamp(competitionData.end_date);
      
      // Determine if we're before start or during competition
      if (startTime && now < startTime) {
        // Competition hasn't started yet - countdown to start
        setIsBeforeStart(true);
        setIsExpired(false);
        return startTime;
      } else if (endTime) {
        // Competition is active or ended - countdown to end
        setIsBeforeStart(false);
        setIsExpired(now >= endTime);
        return endTime;
      }
      
      return null;
    };

    // Initial setup
    const targetTime = getTargetTime();
    if (targetTime) {
      const initial = calculateTimeLeft(targetTime);
      if (initial) {
        setTimeLeft(initial);
      }
    }

    // Set up interval to update every second
    const interval = setInterval(() => {
      const targetTime = getTargetTime();
      if (targetTime) {
        const newTimeLeft = calculateTimeLeft(targetTime);
        if (newTimeLeft) {
          setTimeLeft(newTimeLeft);
          if (newTimeLeft.totalMs <= 0) {
            setIsExpired(true);
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [competitionData]);

  // Determine heading text
  const getHeading = () => {
    if (isExpired) {
      return "Competition ended";
    } else if (isBeforeStart) {
      return "Next launch in";
    } else {
      return "New launches in";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 bg-gray-100 rounded-2xl mb-8 gap-4 sm:gap-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-xl font-medium mb-1 text-base-content/80">
          {getHeading()}
        </h2>
        <p className="text-sm text-base-content/60">
          Top 3 weekly products win badges and get dofollow backlinks.{" "}
          <Link href="/faq" className="link" style={{ color: 'black' }}>
            More details.
          </Link>
        </p>
      </div>
      <div
        ref={timerRef}
        className="flex justify-center items-center space-x-2 countdown-timer"
      >
        {isExpired ? (
          <div className="text-center">
            <div className="text-lg font-medium text-base-content/60">
              Competition Ended
            </div>
            <div className="text-xs text-base-content/50">
              Winners will be announced soon
            </div>
          </div>
        ) : (
          <>
            <div className="text-center">
              <div className="text-xl font-semibold leading-none timer-digit text-black">
                {String(timeLeft.days).padStart(2, "0")}
              </div>
              <div className="text-xs text-base-content/60">days</div>
            </div>
            <span className="text-xl font-semibold text-base-content/40">
              :
            </span>
            <div className="text-center">
              <div className="text-xl font-semibold leading-none timer-digit text-black">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className="text-xs text-base-content/60">hours</div>
            </div>
            <span className="text-xl font-semibold text-base-content/40">
              :
            </span>
            <div className="text-center">
              <div className="text-xl font-semibold leading-none timer-digit text-black">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className="text-xs text-base-content/60">mins</div>
            </div>
            <span className="text-xl font-semibold text-base-content/40">
              :
            </span>
            <div className="text-center">
              <div className="text-xl font-semibold leading-none timer-digit text-black">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className="text-xs text-base-content/60">secs</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
