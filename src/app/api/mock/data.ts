import { MockItemRequest, MockRequestStatus } from "@/utils/types/mock";

let mockItemRequests: MockItemRequest[] = [
  {
    id: 1,
    requestorName: "John Doe",
    itemRequested: "First Aid Kit",
    requestCreatedDate: new Date("2024-12-20"),
    lastEditedDate: new Date("2024-12-23"),
    status: MockRequestStatus.APPROVED,
  },
  {
    id: 2,
    requestorName: "Alice Smith",
    itemRequested: "Bottled Water",
    requestCreatedDate: new Date("2024-12-18"),
    lastEditedDate: new Date("2024-12-18"),
    status: MockRequestStatus.PENDING,
  },
  {
    id: 3,
    requestorName: "Bob Johnson",
    itemRequested: "Non-perishable Food",
    requestCreatedDate: new Date("2024-12-15"),
    lastEditedDate: new Date("2024-12-19"),
    status: MockRequestStatus.COMPLETED,
  },
  {
    id: 4,
    requestorName: "Claire Wilson",
    itemRequested: "Flashlight",
    requestCreatedDate: new Date("2024-12-21"),
    lastEditedDate: new Date("2024-12-22"),
    status: MockRequestStatus.REJECTED,
  },
  {
    id: 5,
    requestorName: "David Lee",
    itemRequested: "Blankets",
    requestCreatedDate: new Date("2024-12-16"),
    lastEditedDate: new Date("2024-12-17"),
    status: MockRequestStatus.APPROVED,
  },
  {
    id: 6,
    requestorName: "Emma Davis",
    itemRequested: "Portable Radio",
    requestCreatedDate: new Date("2024-12-17"),
    lastEditedDate: new Date("2024-12-17"),
    status: MockRequestStatus.PENDING,
  },
  {
    id: 7,
    requestorName: "Frank Taylor",
    itemRequested: "Backup Batteries",
    requestCreatedDate: new Date("2024-12-14"),
    lastEditedDate: new Date("2024-12-15"),
    status: MockRequestStatus.COMPLETED,
  },
  {
    id: 8,
    requestorName: "Grace Hall",
    itemRequested: "Hygiene Kits",
    requestCreatedDate: new Date("2024-12-19"),
    lastEditedDate: new Date("2024-12-20"),
    status: MockRequestStatus.APPROVED,
  },
  {
    id: 9,
    requestorName: "Helen Brown",
    itemRequested: "Prescription Medications",
    requestCreatedDate: new Date("2024-12-20"),
    lastEditedDate: null,
    status: MockRequestStatus.PENDING,
  },
  {
    id: 10,
    requestorName: "Isaac Green",
    itemRequested: "Can Opener",
    requestCreatedDate: new Date("2024-12-13"),
    lastEditedDate: new Date("2024-12-14"),
    status: MockRequestStatus.REJECTED,
  },
  {
    id: 11,
    requestorName: "Jennifer White",
    itemRequested: "Solar Phone Charger",
    requestCreatedDate: new Date("2024-12-21"),
    lastEditedDate: new Date("2024-12-22"),
    status: MockRequestStatus.COMPLETED,
  },
  {
    id: 12,
    requestorName: "Kyle Harris",
    itemRequested: "Water Purification Tablets",
    requestCreatedDate: new Date("2024-12-18"),
    lastEditedDate: new Date("2024-12-20"),
    status: MockRequestStatus.APPROVED,
  },
  {
    id: 13,
    requestorName: "Laura Martinez",
    itemRequested: "Emergency Shelter",
    requestCreatedDate: new Date("2024-12-19"),
    lastEditedDate: new Date("2024-12-19"),
    status: MockRequestStatus.PENDING,
  },
  {
    id: 14,
    requestorName: "Michael Clark",
    itemRequested: "Fire Extinguisher",
    requestCreatedDate: new Date("2024-12-16"),
    lastEditedDate: new Date("2024-12-17"),
    status: MockRequestStatus.REJECTED,
  },
  {
    id: 15,
    requestorName: "Nina Adams",
    itemRequested: "Duct Tape",
    requestCreatedDate: new Date("2024-12-15"),
    lastEditedDate: new Date("2024-12-16"),
    status: MockRequestStatus.PENDING,
  },
];

export default mockItemRequests;