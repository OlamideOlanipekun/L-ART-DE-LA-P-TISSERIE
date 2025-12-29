
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  pastryId: string;
}

const StarRating: React.FC<StarRatingProps> = ({ pastryId }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  useEffect(() => {
    const savedRatings = localStorage.getItem('lart-pastry-ratings');
    if (savedRatings) {
      const ratingsMap = JSON.parse(savedRatings);
      if (ratingsMap[pastryId]) {
        setRating(ratingsMap[pastryId]);
      }
    }
  }, [pastryId]);

  const handleRating = (e: React.MouseEvent, value: number) => {
    e.stopPropagation();
    setRating(value);
    
    const savedRatings = localStorage.getItem('lart-pastry-ratings');
    const ratingsMap = savedRatings ? JSON.parse(savedRatings) : {};
    ratingsMap[pastryId] = value;
    localStorage.setItem('lart-pastry-ratings', JSON.stringify(ratingsMap));
  };

  return (
    <div className="flex flex-col items-start space-y-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none transition-transform active:scale-90"
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={(e) => handleRating(e, star)}
          >
            <Star
              className={`w-3.5 h-3.5 transition-colors duration-200 ${
                star <= (hover || rating)
                  ? 'fill-gold text-gold'
                  : 'text-stone-200 fill-transparent'
              }`}
            />
          </button>
        ))}
        {rating > 0 && (
          <span className="ml-2 text-[8px] font-bold text-stone-400 uppercase tracking-widest animate-in fade-in">
            {rating}.0
          </span>
        )}
      </div>
      <span className="text-[7px] font-bold text-stone-300 uppercase tracking-widest">
        {rating > 0 ? 'Your Rating' : 'Rate this creation'}
      </span>
    </div>
  );
};

export default StarRating;
