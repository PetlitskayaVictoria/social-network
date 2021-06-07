import React, {ChangeEvent} from 'react';

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusType> {
    state = {
        editMode : false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return <div>
            {!this.state.editMode ?
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || "No status"}</span>
                </div> :
                <div>
                    <input autoFocus
                           onChange={this.onChangeHandler}
                           onBlur={this.deactivateEditMode}
                           value={this.state.status}/>
                </div>}

        </div>
    }
}

export default ProfileStatus;
