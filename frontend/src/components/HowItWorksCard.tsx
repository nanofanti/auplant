type HowItWorksCardProps = {
  listNumber: number;
  title: string;
  subTitle: string;
};

function HowItWorksCard({ listNumber, title, subTitle }: HowItWorksCardProps) {
  return (
    <>
      <div>
        <h3>
          {listNumber}. {title}
        </h3>
        <p>{subTitle}</p>
      </div>
    </>
  );
}

export default HowItWorksCard;
