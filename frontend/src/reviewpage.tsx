export default function ParentReviewPage() {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Thank you for your review!");
    (event.target as HTMLFormElement).reset();
  };

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 bg-background">
      <div className="bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Parent Review</h2>
        <p className="text-muted-foreground mb-4">
          We value your feedback. Please share your thoughts with us.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full gap-1.5">
            <label htmlFor="message" className="font-semibold">Your Message</label>
            <textarea placeholder="Type your message here." id="message" required className="w-full p-2 border rounded-md bg-background" />
          </div>
          <button type="submit" className="bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">Submit Review</button>
        </form>
      </div>
    </main>
  );
}