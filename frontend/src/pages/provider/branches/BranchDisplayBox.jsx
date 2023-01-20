import React, { useContext } from "react";
import "./branch.css";
import AddressDisplay from "../../../components/addressNew/AddressDisplay";
import TelephoneDisplay from "../../../components/telephoneNew/TelephoneDisplay";
import {
  deleteBranch,
  updateBranchAddress,
  updateBranchTelephoneList,
} from "../providerApi";
import DeleteButton from "../../../components/ui/buttons/DeleteButton";
import { ProviderContext } from "../context/ProviderContext";

function BranchDisplayBox({ branch }) {
  const { setBranches } = useContext(ProviderContext);
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this Branch")) {
      deleteBranch({
        provider_id: branch.provider,
        branch_id: branch.id,
      });

      setBranches((branches) => {
        return branches.filter((oldBranch) => {
          return oldBranch != branch;
        });
      });
    }
  };

  return (
    <div className="inner-page-box margin_bottom_medium inner-page-box--flex">
      <div className="branch__box_title_main">{branch.branch_name}</div>

      <div className="branch__box_address">
        <span className="branch__box_title">Address </span>
        <AddressDisplay
          apiUpdate={(data) =>
            updateBranchAddress({
              provider_id: branch.provider,
              branch_id: branch.id,
              data: data,
            })
          }
          address={branch?.branchaddress}
        />
      </div>

      <div className="branch__box_telephone">
        <span className="branch__box_title">Telephone Numbers</span>
        {branch?.telephone_numbers?.map((num) => {
          <span>{num?.telephone_number}</span>;
        })}
        <TelephoneDisplay
          apiUpdate={(data) =>
            updateBranchTelephoneList({
              provider_id: branch.provider,
              branch_id: branch.id,
              data: data,
            })
          }
          telephone_numbers_list={branch?.telephone_numbers}
        />
      </div>

      <div className="branch__box_footer">
        <DeleteButton onClick={() => handleDelete()} value="Delete" />
      </div>
    </div>
  );
}

export default BranchDisplayBox;
