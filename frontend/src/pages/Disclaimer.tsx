function Disclaimer() {
  return (
    <div className="bg-auplant-cream px-6 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-auplant-green">
            Important Information
          </p>

          <h1 className="text-3xl font-bold text-auplant-dark sm:text-4xl">
            Disclaimer
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            AuPlant helps plant owners and plant sitters connect. Please read
            the following information before arranging plant-sitting services
            through the platform.
          </p>
        </div>

        {/* Disclaimer content */}
        <div className="space-y-6">
          <DisclaimerSection number="01" title="AuPlant's Role">
            <p>
              AuPlant is a platform designed to help plant owners and plant
              sitters find and contact each other. AuPlant does not directly
              provide plant-sitting services and is not a party to agreements
              made between users.
            </p>
          </DisclaimerSection>

          <DisclaimerSection number="02" title="Agreements Between Users">
            <p>
              Plant owners and plant sitters are responsible for agreeing on the
              details of the service between themselves. This includes dates,
              responsibilities, plant-care instructions, access to the property,
              prices, payment arrangements, and any other relevant conditions.
            </p>

            <p>
              Users should make sure that expectations and responsibilities are
              clearly discussed before a plant-sitting arrangement begins.
            </p>
          </DisclaimerSection>

          <DisclaimerSection number="03" title="Payments">
            <p>
              AuPlant does not currently process payments between users. Payment
              takes place independently from the platform.
            </p>

            <p>
              Plant owners and plant sitters are responsible for agreeing on the
              price, payment method, and payment timing. AuPlant does not
              collect, hold, transfer, or guarantee payments made between users.
            </p>
          </DisclaimerSection>

          <DisclaimerSection number="04" title="Plant Care and Property">
            <p>
              Plant owners are responsible for providing clear and accurate care
              instructions, including information about watering, light, special
              requirements, and any known problems with their plants.
            </p>

            <p>
              Plant sitters are responsible for following the agreed
              instructions and treating the owner's plants and property with
              reasonable care.
            </p>

            <p>
              Users should discuss what should happen if a plant becomes
              damaged, unhealthy, or requires unexpected care during the sitting
              period.
            </p>
          </DisclaimerSection>

          <DisclaimerSection number="05" title="Access and Security">
            <p>
              Some plant-sitting arrangements may require access to another
              person's home or property. Users are responsible for deciding how
              keys, access codes, or other access information are exchanged.
            </p>

            <p>
              Users should only share information that is necessary for the
              agreed service and should take appropriate precautions when
              arranging access to private property.
            </p>
          </DisclaimerSection>

          <DisclaimerSection number="06" title="Communication and Safety">
            <p>
              Users are responsible for evaluating who they choose to contact
              and work with. AuPlant does not guarantee the identity,
              reliability, experience, or conduct of individual users.
            </p>

            <p>
              If anything about an arrangement feels unclear, users should
              discuss it before proceeding and avoid sharing unnecessary
              personal or sensitive information.
            </p>
          </DisclaimerSection>

          <DisclaimerSection number="07" title="Problems Between Users">
            <p>
              Any disagreements regarding plant-sitting services, payments,
              property access, damage, cancellations, or other arrangements
              should be resolved directly between the users involved.
            </p>

            <p>
              AuPlant provides the tools for users to discover and communicate
              with each other but does not currently act as a mediator for
              private agreements between users.
            </p>
          </DisclaimerSection>
        </div>

        {/* Bottom notice */}
        <div className="mt-8 rounded-2xl border border-auplant-olive bg-auplant-sage p-6">
          <h2 className="font-semibold text-auplant-dark">Please remember</h2>

          <p className="mt-2 text-sm leading-6 text-auplant-dark">
            AuPlant helps people connect, but the final plant-sitting
            arrangement is made directly between the plant owner and the plant
            sitter. Discuss the important details beforehand and make sure both
            sides understand what has been agreed.
          </p>
        </div>
      </div>
    </div>
  );
}

type DisclaimerSectionProps = {
  number: string;
  title: string;
  children: React.ReactNode;
};

function DisclaimerSection({
  number,
  title,
  children,
}: DisclaimerSectionProps) {
  return (
    <section className="rounded-2xl border border-auplant-sage bg-white p-6 shadow-sm sm:p-8">
      <div className="flex gap-5">
        <span className="text-sm font-bold text-auplant-green">{number}</span>

        <div>
          <h2 className="text-xl font-bold text-auplant-dark">{title}</h2>

          <div className="mt-3 space-y-3 leading-7 text-gray-600">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Disclaimer;
