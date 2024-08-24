import React from "react";

const PlayZoneRules = () => {
  return (
    <div className="bg-gray-100 min-h-screen bg-[url('/image-woo.jpeg')] bg-cover bg-center bg-no-repeat px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-lg bg-white bg-opacity-90 p-6 shadow-lg">
        <h1 className="text-gray-800 mb-6 text-2xl font-bold">
          The Wiggly Woo Play Zone Rules and Regulations
        </h1>
        <ol className="text-gray-700 list-inside list-decimal space-y-4">
          <li>
            The Wiggly Woo team constantly monitors the play zone to ensure a
            safe environment for all visitors. However, parents or guardians are
            ultimately responsible for their children’s well-being.
          </li>
          <li>
            Children and guardians are kindly requested to wear socks at all
            times while enjoying the Wiggly Woo play area. Shoes are not
            allowed, and barefoot play is prohibited.
          </li>
          <li>
            The play equipment in our Wiggly Woo zone is specifically designed
            for children’s enjoyment. Parents are encouraged to guide and
            support their children but are asked not to use the equipment
            themselves.
          </li>
          <li>
            For the cleanliness and safety of everyone, we kindly ask that no
            outside food or drinks be brought into the Wiggly Woo play area. Our
            cafe offers a delightful selection of snacks and beverages for your
            convenience.
          </li>
          <li>
            While we do our best to maintain a secure environment, the Wiggly
            Woo team cannot be held responsible for any loss, theft, or damage
            to personal belongings.
          </li>
        </ol>
        <p className="text-gray-700 mt-6">
          Note: Please fill out the details below if the child exceeds 1 hour in
          the Wiggly Woo play zone.
        </p>
      </div>
    </div>
  );
};

export default PlayZoneRules;
