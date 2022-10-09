import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deletePhoneNumber,
  updatePhoneNumber,
} from "../../utils/api_calls/telephoneApi";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";

import { useTranslation } from "react-i18next";
import { getProfile } from "./providerApi";
import { Address } from "../../components/Address";
import AddressUpdate from "../../components/ui/AddressUpdate";

import Modal from "@mui/material/Modal";
import APIENDPOINT from "../../utils/api_calls/apiEndpoint";

function ProviderProfileUpdate() {
  const token = JSON.parse(localStorage.getItem("authTokens"));

  const { id } = useParams();
  const { t } = useTranslation();
  const [updating, setUpdating] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [telephones, setTelephones] = useState([]);
  const [profile, setProfile] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [updatingAddress, setUpdatingAddress] = useState();
  const [open, setOpen] = useState(false);


  const updateProfile = async ()=>{
    const response = await fetch(`${APIENDPOINT}/users/provider/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
      body: JSON.stringify({
        name:profile.name,
      }),
    });
  }

  const addPhone = async () => {
    const response = await fetch(`${APIENDPOINT}/users/provider/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
      body: JSON.stringify({
        telephone_numbers: [{ telephone_number: newPhone }],
      }),
    });

    setTelephones((prev) => [...prev, { telephone_number: newPhone }]);
  };
  const handlePhoneChange = (event) => {
    const num = event.target.value;
    setNewPhone(num);
  };
  const handleOpen = (address) => {
    setUpdatingAddress(address);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const retreiveProfile = async () => {
    const profile = await getProfile(id);
    setProfile(profile);
    setAddresses(profile.address);
    setTelephones(profile.telephone_numbers);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 600,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    retreiveProfile();
  }, []);

  return (
    <div className="page_padding_bottom">
      <>
        <div className="primary--page-box">
          <h1 className="margin_bottom_small"> {t("profile_information")}</h1>
          <h4 className="subtitle">{t("name")}: </h4>
          {updating ? (
            <input
              className="form-fields"
              onChange={(e) => {
                setProfile((prev) => {
                  return { ...prev, name: e.target.value };
                });
              }}
              value={profile?.name}
            />
          ) : (
            profile?.name
          )}
            <br/>
          <h4 className="subtitle">{t("owner")}:</h4>
          {profile?.owner_email}
          <br/>
          <h4 className="subtitle">{t("date_create")}:</h4>
          {profile?.date_created }
          <br/>
          <h4 className="subtitle">{t("telephone_numbers")}:</h4>
          {updating && (
            <div>
              <input
                className="form-fields"
                value={newPhone}
                type="text"
                onChange={handlePhoneChange}
              />
              <input
                className="secondry-button"
                onClick={() => {
                  addPhone();
                }}
                type="button"
                value={t("add_telephone_number")}
              />
            </div>
          )}

          {telephones?.map((num, index) => {
            return (
              <div key={num.id || index} style={{ padding: "0.4rem" }}>
                {!updating ? (
                  <> {num.telephone_number}</>
                ) : (
                  <>
                    <input
                      className="form-fields"
                      value={num.telephone_number}
                      type="text"
                      onChange={(e) => {
                        setTelephones((prev) => {
                          return prev.filter((number) => {
                            if (number === num) {
                              number.telephone_number = e.target.value;
                            }
                            return telephones;
                          });
                        });
                      }}
                    />

                    <input
                      className="secondry-button"
                      type="button"
                      value={t("update")}
                      onClick={() => {
                        updatePhoneNumber(num.id, num.telephone_number);
                      }}
                    />
                    <DeleteIcon
                      onClick={() => {
                        deletePhoneNumber(num.id);
                        setTelephones((prev) => {
                          return prev.filter((number, index) => {
                            return number.id != num.id;
                          });
                        });
                      }}
                      color="error"
                      style={{ cursor: "pointer", fontSize: "20" }}
                    />
                  </>
                )}
              </div>
            );
          })}

          <input
            type="button"
            className="page_button page_button-width-small-fixed "
            value={updating ? t("save") : t("update")}
            onClick={() => {
              setUpdating((prev) => !prev);
              updating && updateProfile()
            }}
          />
        </div>

        <div className="primary--page-box">
          <h2 className="margin_bottom_small">{t("address")}</h2>
          <div className="inner-page-box--flex-row width_100 space_evenly align-items-center ">
 
            {addresses.map((address) => {
              return (
                <div key={address.id}>
                  <Address
                    key={address.id}
                    address={address}
                    deleteFromParent={() => {
                      setAddresses((prev) => {
                        return prev.filter((item) => {
                          return item.id !== address.id;
                        });
                      });
                    }}
                  >
                    <input
                      // type="buttond "
                      className="page_button "
                      value={t("update")}
                      onClick={() => handleOpen(address)}
                    />
                  </Address>

                </div>
              );
            })}
            <input
              className="page_button page_button-width-medium page_button-padding-inline-small"
              type="button"
              value={t("add_address")}
              onClick={() => {
                handleOpen();
              }}
            />
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <AddressUpdate
                address={updatingAddress}
                closeModal={() => handleClose()}
                ownerId={id}
                ownerType={"provider"}
                updateParent={(values) =>
                  setAddresses((prev) => {
                    if (updatingAddress) {
                      const newList = prev.map((address) => {
                        if (address.id === updatingAddress.id) {
                          address.unit_number = values.unit_number;
                          address.first_line = values.first_line;
                          address.second_line = values.second_line;
                          address.city = values.city;
                          address.governorate = values.governorate;
                          return address;
                        } else {
                          return address;
                        }
                      });
                      console.log(newList);
                      return (prev = newList);
                    } else {
                      return [...prev, values];
                    }
                  })
                }
              />
            </Box>
          </Modal>
        </div>
      </>
    </div>
  );


  return (
    <>
      <>
        <div className="inpage-container">
          <h1> {t("profile_information")}</h1>
          <h4>{t("name")}</h4>
          {updating ? (
            <input
              className="form-fields"
              onChange={(e) => {
                setProfile((prev) => {
                  return { ...prev, name: e.target.value };
                });
              }}
              value={profile?.name}
            />
          ) : (
            profile?.name
          )}

          <h4>{t("owner")}</h4>
          {profile?.owner_email}

          <h4>{t("date_create")}</h4>
          {profile?.date_created}

          <h4>{t("telephone_numbers")}</h4>
          {updating && (
            <div>
              <input
                className="form-fields"
                value={newPhone}
                type="text"
                onChange={handlePhoneChange}
              />
              <input
                className="secondry-button"
                onClick={() => {
                  addPhone();
                }}
                type="button"
                value={t("add_telephone_number")}
              />
            </div>
          )}

          {telephones?.map((num, index) => {
            return (
              <div key={num.id || index} style={{ padding: "0.4rem" }}>
                {!updating ? (
                  <> {num.telephone_number}</>
                ) : (
                  <>
                    <input
                      className="form-fields"
                      value={num.telephone_number}
                      type="text"
                      onChange={(e) => {
                        setTelephones((prev) => {
                          return prev.filter((number) => {
                            if (number === num) {
                              console.log(number);
                              number.telephone_number = e.target.value;
                            }
                            return telephones;
                          });
                        });
                      }}
                    />

                    <input
                      className="secondry-button"
                      type="button"
                      value={t("update")}
                      onClick={() => {
                        updatePhoneNumber(num.id, num.telephone_number);
                      }}
                    />
                    <DeleteIcon
                      onClick={() => {
                        deletePhoneNumber(num.id);
                        setTelephones((prev) => {
                          return prev.filter((number, index) => {
                            return number.id != num.id;
                          });
                        });
                      }}
                      color="error"
                      style={{ cursor: "pointer", fontSize: "20" }}
                    />
                  </>
                )}
              </div>
            );
          })}

          <input
            type="button"
            className="secondry-button"
            value={updating ? t("save") : t("update")}
            onClick={() => {
              setUpdating((prev) => !prev);
              updating && updateProfile()
            }}
          />
        </div>

        <div className="inpage-container">
          <h4>{t("address")}</h4>
          <div className="inner-container">
            <input
              className="secondry-button"
              type="button"
              value={t("add_address")}
              onClick={() => {
                handleOpen();
              }}
            />
            {addresses.map((address) => {
              return (
                <div key={address.id}>
                  <Address
                    key={address.id}
                    address={address}
                    deleteFromParent={() => {
                      setAddresses((prev) => {
                        return prev.filter((item) => {
                          return item.id !== address.id;
                        });
                      });
                    }}
                  >
                    <input
                      type="button"
                      className="secondry-button"
                      value={t("update")}
                      onClick={() => handleOpen(address)}
                    />
                  </Address>
                </div>
              );
            })}
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <AddressUpdate
                address={updatingAddress}
                closeModal={() => handleClose()}
                ownerId={id}
                ownerType={"provider"}
                updateParent={(values) =>
                  setAddresses((prev) => {
                    if (updatingAddress) {
                      const newList = prev.map((address) => {
                        if (address.id === updatingAddress.id) {
                          address.unit_number = values.unit_number;
                          address.first_line = values.first_line;
                          address.second_line = values.second_line;
                          address.city = values.city;
                          address.governorate = values.governorate;
                          return address;
                        } else {
                          return address;
                        }
                      });
                      console.log(newList);
                      return (prev = newList);
                    } else {
                      return [...prev, values];
                    }
                  })
                }
              />
            </Box>
          </Modal>
        </div>
      </>
    </>
  );
}

export default ProviderProfileUpdate;
