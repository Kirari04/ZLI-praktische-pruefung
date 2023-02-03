import {
	useToast,
	Button,
	useDisclosure,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	Code,
} from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
	deleteWorkItem_fn,
} from "../_func"
import React from "react"
import { deleteWorkItem_jwtfn } from "../_func.jwt"
import Auth from "../_auth"
import { UserContext } from "../hooks/_state"

export default function DeleteWorkButtonComponent(props: {
    data: LoadWorkItem;
    callback?: Function;
    jwt?: boolean
}) {
	const data = props.data
	const navigate = useNavigate()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = React.useRef()
	const [isLoadingButton, setIsLoadingButton] = useState(false)
	const [token, settoken] = useState<null | string>(null)
	const { isAuth, setIsAuth } = useContext(UserContext)
	const toast = useToast()

	useEffect(() => {
		new Auth(
			(e: Auth) => {
				settoken(e.token)
			},
			isAuth,
			setIsAuth,
			false
		)
	}, [])

	const deleteData = async () => {
		if (data?.success && data.data) {
			setIsLoadingButton(true)
			let res
			if(!props.jwt){
				res = await deleteWorkItem_fn("/task", data?.data?.id)
			}else{
				res = await deleteWorkItem_jwtfn("/auth/jwt/task", data?.data?.id, `${token}`)
			}
			setIsLoadingButton(false)
			if (!res.success) {
				toast({
					title: "Failed to Fetch.",
					description: res.error,
					status: "error",
					duration: 9000,
					isClosable: true,
				})
			} else {
				toast({
					title: "Success",
					description: `${data.data.title} wurde gelöscht`,
					status: "success",
					duration: 2000,
					isClosable: true,
				})
				if (!props.callback) {
					navigate("/aufgaben")
				}
				if(props.callback){
					props.callback()
				}
			}
		}
	}
	return (
		<>
			<Button
				onClick={onOpen}
				colorScheme={"red"}
				isLoading={isLoadingButton}
			>
                Delete
			</Button>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef as any}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Work
						</AlertDialogHeader>

						<AlertDialogBody>
                            Are you sure you want to delete{" "}
							<Code>{data.data?.title}</Code>? You can't undo this
                            action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button onClick={onClose}>Cancel</Button>
							<Button
								colorScheme="red"
								onClick={() => {
									onClose()
									deleteData()
								}}
								ml={3}
							>
                                Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	)
}
