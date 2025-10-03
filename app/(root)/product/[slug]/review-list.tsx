"use client";

import { Review } from "@/types";
import Link from "next/link";
import { useState } from "react";

const ReviewList = ({
  userId,
  productId,
  productSlug,
}: {
  userId: string;
  productId: string;
  productSlug: string;
}) => {
  // console.log(userId, productId, productSlug);
  const [reviews, setReviews] = useState<Review[]>([]);

  return (
    <div className="space-y-4">
      {reviews.length === 0 && <div>No reviews yet</div>}
      {userId ? (
        <div>{userId}</div>
      ) : (
        <div>
          Please
          <Link
            className="text-blue-700 px-2"
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
          >
            sign in
          </Link>
          to write a review
        </div>
      )}
      <div className="flex flex-col gap-3">{/* REVIEWS IS HERE  */}</div>
    </div>
  );
};

export default ReviewList;
