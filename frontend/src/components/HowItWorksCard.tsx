type HowItWorksCardProps = {
  listNumber: number;
  title: string;
  subTitle: string;
};

function HowItWorksCard({ listNumber, title, subTitle }: HowItWorksCardProps) {
  return (
    <>
      <div className="bg-green-300 p-4">
        <h3 className="text-4xl p-4">
          {listNumber}. {title}
        </h3>
        <p>{subTitle}</p>
      </div>
    </>
  );
}

export default HowItWorksCard;
