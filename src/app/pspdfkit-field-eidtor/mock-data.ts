export interface SignerDataItem {
  id: string;
  name: string;
  disabled: boolean;
  color: string;
  role: string;
}

export const MockSigneeList: SignerDataItem[] = [
  {
    id: "t1",
    name: "Ernser",
    role: "CEO",
    disabled: false,
    color: "#ffcc00",
  },
  {
    id: "t2",
    name: "Hackett",
    role: "Administrator",
    disabled: false,
    color: "#aabbcc",
  },
  {
    id: "t3",
    name: "Koss",
    role: "Executive",
    disabled: false,
    color: "#ddff00",
  },
  {
    id: "t4",
    name: "Little",
    role: "Board member",
    disabled: false,
    color: "#00ffcc",
  },
];

export const pspdfkitConfig = {
  licenseKey: 'amnu679oQC57xHzOmPnGMRBVw5i31l3aEELPMm1ARplhSkgnGKlGde4CX6y0WqMKcgfJe6_j3320K_Wg12sD1ZX3jM4QwoZazPFnEj-hYzj_a83M8FkvXBlhtqzR5dLa2zRBmOess8Pi3PJNFdUobLEwU5K8EBp3H5WgPf0WhyKyjYaew0Nsyoz6dZrTrWwZdMLmY9xH2TU4zeRMFsb6Ida-O2OaTPt2uznO8CZUx4GM25dNR645BR1ArnxGRdMotMF_zrr2leNZ-2IJibKhWIEM2hZEekPlRFv1Gvxs6dQIfMOt1qC428ndA5oQUsKmpKgU3lyr5yWglKHLLR8BDv--Ej11YQzEdxTLHW9bbvhaZau_ijIUwYzX7LqD7NHky3iCkn3y000Ro2Oo04mNKTBmdUYkq5j6ptMxSraFrX4ucb3rfvuCEkAfT_FBt_QIO5VtzLzEzLOk4DStNlOxRj0wUj5PagEQUS6NNuuQISqpYHJglE70L4pga923u78VYact--j-focP8Qa1Jh32o6NVOZ5dU30M_qNJruvbi69wtrHWi_E-v4ZtzwzV7RWhatpl0lTPWo-3yHbAPAtn7CWDaA2Tp78swMTQX2t1V_5KKB17xd6GmVGqf_8RjunnXMrXI3Giyav-_cJ0g5lq2lNgNUZUSXTocQJpGkG70RIYFjSPgEN8cEuN8vHBAWOhY6nYRc7MxELJ6o2M_LEQdg==',
  documentId: "7KRXMJ8N7JQY1F1AJS0T16Q621",
  jwt: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2N1bWVudF9pZCI6IjdLUlhNSjhON0pRWTFGMUFKUzBUMTZRNjIxIiwicGVybWlzc2lvbnMiOlsicmVhZC1kb2N1bWVudCIsIndyaXRlIiwiZG93bmxvYWQiXSwiaWF0IjoxNjgwNzM5MzQ1LCJleHAiOjE2ODA5OTg1NDV9.LiM14XIhxZZxAT6QO1s9ezLBH3J8-_FhOVTkaPmFvAq9KQe-EBVhEezJQH9Np0tDO85A6poY26SqBccyoe5C7B1mQbvnv8YXm0WU-9KFhbD4l1EGffxiBCpgP5M0UKlCAA54fyhex0wr1yMXV47L9XMYGVgFAmtL8aqa4kDQ2xNRK78VSWGNxf0C405UlZkKSakiVhUGrNPa8_jw3jD2QF46cJe06kyoWrYyQC0tbVD4fhhnsQHuGNEjSdVpEtIbz3XBcY4-aYQJ4qhJNHpTecSZ1cumDQRzaNFnrlv5K7Cro-Y5z_oDSTxcmPCnYmP2GY6okVaxAXTy9CAzqaknoqF2PW-18fwyXkQMj4TxsDx-EEH_wXq4eR8JactmsKfV40k0sOYDmJypLcq2Odp7F_BO9M-2YVmWWiGW39-Dr9mjV-N7yYx6dm6w8oyRVOTzjAhFovg9mnwTV324t4xlOE7-CLxdNZl99V7VGLAJVyH5CtlGSj5Gxpp8nN8vIuGTD2F4zvnPcadq2EGpcGH1kFeKoV1BuXMstJzMvCZzn7duqMfUgexp78R7quOOmDTTZtrScTUqCKyypzzCAQvh4ilkGzeX4e2Yqm686bWdfURu3m4cKs2EPgkwuWE6hYbfvNJd6UEe9Y_L7gpO_OXyPHebPdIraX15BKEMnXhFexk"
  // different layer
  // jwt:"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2N1bWVudF9pZCI6IjdLUlhNSjhON0pRWTFGMUFKUzBUMTZRNjIxIiwibGF5ZXIiOiJzaWduYXR1cmVfbGF5ZXIiLCJwZXJtaXNzaW9ucyI6WyJyZWFkLWRvY3VtZW50Iiwid3JpdGUiLCJkb3dubG9hZCJdLCJpYXQiOjE2ODA3NDQxMzEsImV4cCI6MTY4MTAwMzMzMX0.kgGdDpWAUc7PsET0S7IFWJ49jCAbGZEiUwYkfmWDg6pW0FtmwQ6beM1BGyD_P3ltFuh8T5zAdEGDW9D3-g2soD5scI-b31uRvbyPxft9vfUZhej0MYV9B0Fm-vdnT7ExLOiZDyapSojj-WIQUByKR7r2X6iTkwOBMXL34JVEQaw7Ob7fQP6svT5v2t566yjaO4KkndWR04VlwDhNPe3ExTwLRyS_bDhyT_WNnadyhlvjQDGo7ATpV4_mHGHooXH7yFERdPOwq_TqRop8YAvwy2HkzfuBqpQNe9AOpKAP2EeJAee-LNa2HR0eKpgd1GIohgM_JSMrgWJP47_l-3IL7mWSkycNh9q2jVw1bdZZMJuYOUzNIx7cBqZg3YduDwf5Eb_uDWBap182tgBRsk7K00YHndQwzDEjQzE9_YjfNl3tlkOkGZ5GLbwrqqDZbDFcY0rpyrXyfZX9ZhNHe09DPZBtGDIaCjpHQ0TFPkF9RXC7lkjD8cWGbrwMJuaeexaEsB_Kp9uw7LC68kfEyhEjtCLQ-B_2esNb4rqAi0JApXTm60TbL6qBHjUForT1fHJIHGzU9Dtyy2ycQS0FxX-YElD8qKBvpJmlqrU3Ic_RK4jgzhJfZPVQnYmGKCzbgA_YTPUXMYESMlz7hLGZIYIe8E1A0R6sIfLLWNa1lHdyu6c"
}